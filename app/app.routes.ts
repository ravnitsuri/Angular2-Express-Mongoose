import {provideRouter, RouterConfig} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {LoginComponent} from './login.component';
import {SignupComponent} from './signup.component';
import {AdminDashboardComponent} from './admindash.component';
import {AuthGuard} from './authguard.service'


export const routes: RouterConfig = [
	{ path: '', component: LoginComponent , canActivate: [AuthGuard]},
	{ path: 'signup', component: SignupComponent , canActivate: [AuthGuard]},
	{ path: 'admindashboard' , component: AdminDashboardComponent, canActivate: [AuthGuard]},
	{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
	{ path: '**', redirectTo: '/', }
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes),
	AuthGuard
];