import {Component, OnInit} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

@Component({
	selector: 'dashboard',
	templateUrl: 'app/templates/dashboard.component.html',
	styleUrls: ['app/css/admindash.component.css'],
	directives: [ROUTER_DIRECTIVES]
})

export class DashboardComponent implements OnInit{

	private user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : {_id: "" , name:"" , username: "", password: ""};

	constructor(private _router: Router) {	}

	ngOnInit() {


	}

	logout() {
		localStorage.clear();
		this._router.navigate(['/']);
	}
}
