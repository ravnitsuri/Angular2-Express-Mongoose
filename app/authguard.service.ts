import { Injectable }     from '@angular/core';
import { CanActivate, Router,
		ActivatedRouteSnapshot,
		RouterStateSnapshot }    from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private _router: Router) {	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

		// console.log(route, state)

		if ( !localStorage.getItem('user') ) {

			if (state.url == '/') {

			}

			if (state.url != '/' && state.url != "/signup") {
				this._router.navigate(['/']);
				// console.log("case 1")
				return false;
			}
		}

		if ( localStorage.getItem('user') && (state.url == "/" || state.url == "/signup" ) ) {

			if (JSON.parse(localStorage.getItem('user')).type == 1) {
				// console.log("case 2")
				this._router.navigate(['/admindashboard']);
				return false;
			}
			if (JSON.parse(localStorage.getItem('user')).type == 2){
				// console.log("case 3")
				this._router.navigate(['/dashboard']);
				return false;
			}
				
		}

		if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).type != 1 && state.url == "/admindashboard") {
			// console.log("case 4")
			this._router.navigate(['/dashboard']);
			return false;
		}

		if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).type == 1 && state.url == "/dashboard") {
			// console.log("case 5")
			this._router.navigate(['/admindashboard']);
			return false;
		}

		else {
			// console.log("case 6")
			return true;
		}

	}
}