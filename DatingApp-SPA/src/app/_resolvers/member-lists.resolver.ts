import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router,} from '@angular/router';

import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {AlertifyService} from '../_services/alertify.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class MemberListsResolver implements Resolve<User[]> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUsers().pipe(
      catchError((error) => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/home']);

        return of(null);
      }),
    );
  }
}
