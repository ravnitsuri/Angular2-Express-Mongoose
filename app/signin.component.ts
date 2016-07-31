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
					console.log("User exists! Yaaay!");
					localStorage.setItem('user', JSON.stringify(res.json())) ;
					this.sendInfoMsg("User exists.", "success");
					this._router.navigate(['/dashboard']);
				} else {
					console.log("User does not exist. Please go away.");
					this.sendInfoMsg("User does not exists.", "danger");
				}

			},
			error => {
				console.log("There was an error finding the user. Please try again later.");
				this.sendInfoMsg("Error finding user.", "danger");
			}
		)
	}

	sendInfoMsg(body, type, time = 3000) {
		this.infoMsg.body = body;
		this.infoMsg.type = type;
		window.setTimeout(() => this.infoMsg.body = "", time);
	}

}
