import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router,} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {AlertifyService} from '../_services/alertify.service';
import {AuthService} from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private alertify: AlertifyService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService
      .getUser(this.authService.decodedToken.nameid)
      .pipe(
        catchError((error) => {
          this.alertify.error('Problem retrieving your data');
          this.router.navigate(['/members']);

          return of(null);
        }),
      );
  }
}
