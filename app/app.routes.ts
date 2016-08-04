import {provideRouter, RouterConfig} from '@angular/router';

import {HomeComponent} from './home.component';
import {SigninComponent} from './signin.component';
import {DashboardComponent} from './dashboard.component';
import {LoginComponent} from './login.component';
import {SignupComponent} from './signup.component';
import {AdminDashboardComponent} from './admindash.component';
import {AuthGuard} from './authguard.service'


export const routes: RouterConfig = [
	{ path: '', component: LoginComponent , canActivate: [AuthGuard]},
	{ path: 'signup', component: SignupComponent , canActivate: [AuthGuard]},
	{ path: 'admindashboard' , component: AdminDashboardComponent, canActivate: [AuthGuard]},
	{ path: 'home', component: HomeComponent },
	{ path: 'signin', component: SigninComponent},
	{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes),
	AuthGuard
];