import {Component, OnInit} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {FormGroup, FormControl, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';

@Component({
	selector: 'home',
	templateUrl: 'app/home.component.html',
	directives: [REACTIVE_FORM_DIRECTIVES]
})

export class HomeComponent implements OnInit {

	private users = [];
	private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' }) });

	private isEditing = false;
	private user = {};

	private infoMsg = { body: "", type: "info"};

	private addUserForm: FormGroup;
	private name = new FormControl("", Validators.required);
	private username = new FormControl("", Validators.required);
	private password = new FormControl("", Validators.required);

	constructor(private http: Http, private formBuilder: FormBuilder) {	}

	ngOnInit() {
		this.addUserForm = this.formBuilder.group({
			name: this.name,
			username: this.username,
			password: this.password
		});

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

	submitAdd() {
		this.http.post("/user", JSON.stringify(this.addUserForm.value), this.options).subscribe(
			res => {
				this.users.push(res.json()); // the response contains the new item
				this.sendInfoMsg("User added successfully.", "success");
				// TODO: reset the form here
			},
			error => {
				this.sendInfoMsg("User already exists.", "danger");
			} 
		);
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

}