import {Component, OnInit} from '@angular/core';

import {AuthService} from '../_services/auth.service';
import {AlertifyService} from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  name: string;

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
  ) {
  }

  ngOnInit() {
    this.name = this.authService.decodedToken.unique_name;
  }

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        // console.log('Logged in successfully');
        this.alertify.success('Logged in successfully');
      },
      (error) => {
        // console.log(error);
        this.alertify.error(error);
      },
    );
    this.name = this.authService.decodedToken.unique_name;
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');

    this.alertify.message('Logged out');

  }
}
