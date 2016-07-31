import {provideRouter, RouterConfig} from '@angular/router';

import {HomeComponent} from './home.component';
import {SigninComponent} from './signin.component';
import {DashboardComponent} from './dashboard.component';

export const routes: RouterConfig = [
	{ path: '', component: HomeComponent },
	{ path: 'signin', component: SigninComponent },
	{ path: 'dashboard', component: DashboardComponent }
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
];