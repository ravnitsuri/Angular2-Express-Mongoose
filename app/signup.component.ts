import {Component, OnInit} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {TimerWrapper} from '@angular/core/src/facade/async';

@Component({
	selector: 'signup',
	templateUrl: 'app/templates/signup.component.html',
	styleUrls: ['app/css/signup.component.css'],
	directives: [ROUTER_DIRECTIVES]
})

export class SignupComponent implements OnInit { 

	// private users = [];
	private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' }) });

	private user = {};

	private infoMsg = { body: "", type: "info"};

	// private addUserForm: FormGroup;
	// private name = new FormControl("", Validators.required);
	// private username = new FormControl("", Validators.required);
	// private password = new FormControl("", Validators.required);

	constructor(private http: Http, private _router: Router) {	}

	ngOnInit() {
		this.user = {};
	}

	sendInfoMsg(body, type, time = 3000) {
		this.infoMsg.body = body;
		this.infoMsg.type = type;
		window.setTimeout(() => this.infoMsg.body = "", time);
	}

	submitAdd() {
		this.http.post("/user", JSON.stringify(this.user), this.options).subscribe(
			res => {
				// this.users.push(res.json()); // the response contains the new item
				this.sendInfoMsg("User added successfully. Redirecting.", "success");

				TimerWrapper.setTimeout(() => {  
					localStorage.setItem('user', JSON.stringify(this.user)) ;
					this._router.navigate(['/admindashboard']);
				}, 2000);

				// this._router.navigate(['/admindashboard']);
				// TODO: reset the form here
			},
			error => {
				this.sendInfoMsg("User already exists.", "danger");
			} 
		);
	}

}