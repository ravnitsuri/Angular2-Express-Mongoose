import {Component} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
// import {TimerWrapper} from '@angular/core/src/facade/async';

@Component({
	selector: 'login',
	templateUrl: 'app/templates/login.component.html',
	styleUrls: ['app/css/login.component.css'],
	directives: [ROUTER_DIRECTIVES],
})

export class LoginComponent {

	private user = {};
	private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' }) });
	private infoMsg = { body: "", type: "info"};

	constructor(private http: Http , private _router: Router) {


	}

	formSubmit() {
		this.http.post('/login', JSON.stringify(this.user) , this.options).subscribe(
			res => {
				if (res.json() != null) {
					localStorage.setItem('user', JSON.stringify(res.json())) ;
					if (res.json().type == 1) {
						this._router.navigate(['/admindashboard']);
					}
					if (res.json().type == 2) {
						this._router.navigate(['/dashboard']);
					}
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
		// window.setTimeout(() => this.infoMsg.body = "", time);
	}



}