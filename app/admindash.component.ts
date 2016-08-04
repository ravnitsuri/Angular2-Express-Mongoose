import {Component, OnInit} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

@Component({
	selector: 'admindash',
	templateUrl: 'app/templates/admindash.component.html',
	styleUrls: ['app/css/admindash.component.css'],
	directives: [ROUTER_DIRECTIVES]
})

export class AdminDashboardComponent implements OnInit{ 
	private users = [];
	private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' }) });

	private isEditing = false;
	private user = {};

	private infoMsg = { body: "", type: "info"};

	constructor(private http: Http, private _router: Router) {	}

	ngOnInit() {

			this.loadUsers();

	}

	loadUsers() {
		this.http.get("/users")
			.map(res => res.json())
			.subscribe(
				data => this.users = data,
				error => console.log(error)
			);
	}

	sendInfoMsg(body, type, time = 3000) {
		this.infoMsg.body = body;
		this.infoMsg.type = type;
		window.setTimeout(() => this.infoMsg.body = "", time);
	}

	enableEditing(user) {
		this.isEditing = true;
		this.user = user;
	}

	cancelEditing() {
		this.isEditing = false;
		this.user = {};
		this.sendInfoMsg("item editing cancelled.", "warning");
		this.loadUsers();
	}

	submitEdit(user) {
		this.http.put("/user/"+user._id, JSON.stringify(user), this.options).subscribe(
			res => {
				this.isEditing = false;
				this.user = user;
				this.sendInfoMsg("item edited successfully.", "success");
			},
			error => console.log(error)
		);
	}

	submitRemove(user) {
		if(window.confirm("Are you sure you want to permanently delete this item?")) {
			this.http.delete("/user/"+user._id, this.options).subscribe(
				res => {
					var pos = this.users.map((e) => { return e._id }).indexOf(user._id);
					this.users.splice(pos, 1);
					this.sendInfoMsg("item deleted successfully.", "success");
				},
				error => console.log(error)
			);
		}
	}

	logout() {
		localStorage.clear();
		this._router.navigate(['/']);
	}

}