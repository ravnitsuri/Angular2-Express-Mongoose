import {Component} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

@Component({
	selector: 'signin',
	templateUrl: 'app/signin.component.html',
	directives: [ROUTER_DIRECTIVES]
})

export class SigninComponent { 

	private user = {};
	private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' }) });
	private infoMsg = { body: "", type: "info"};

	constructor(private http: Http , private _router: Router) {	}

	formSubmit() {
		this.http.post('/login', JSON.stringify(this.user) , this.options).subscribe(
			res => {
				if (res.json() != null) {
					this.sendInfoMsg("User exists. Redirecting.", "success");
					console.log("User exists! Yaaay!");
					localStorage.setItem('user', JSON.stringify(res.json())) ;
					this._router.navigate(['/dashboard']);
				} 
			},
			error => {
				console.log("Error response for login.");
				if (error.status == 400) {
					this.sendInfoMsg("Incorrect password.", "danger");
				}
				if (error.status == 401) {
					this.sendInfoMsg("Username does not exist.", "danger");
				}
				if (error.status == 500) {
					this.sendInfoMsg("Error finding user. Try again.", "danger");
				}
			}
		)
	}

	sendInfoMsg(body, type, time = 3000) {
		this.infoMsg.body = body;
		this.infoMsg.type = type;
		window.setTimeout(() => this.infoMsg.body = "", time);
	}

}
