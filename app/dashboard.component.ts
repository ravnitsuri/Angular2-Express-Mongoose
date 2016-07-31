import {Component} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

@Component({
	selector: 'dashboard',
	templateUrl: 'app/dashboard.component.html',
	directives: [ROUTER_DIRECTIVES]
})

export class DashboardComponent {

	private user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : {_id: "" , name:"" , username: "", password: ""};

	constructor(private _router: Router) {	}

	onBack() {
		console.log("Going back in time")
		window.history.back();

		localStorage.removeItem('user') ;
		this._router.navigate(['/signin']);

	}

}
