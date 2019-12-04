import {Component, HostListener, OnInit, ViewChild,} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

import {User} from '../../_models/user';
import {AlertifyService} from '../../_services/alertify.service';
import {UserService} from '../../_services/user.service';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-members-edit',
  templateUrl: './members-edit.component.html',
  styleUrls: ['./members-edit.component.css'],
})
export class MembersEditComponent implements OnInit {
  @ViewChild('editForm', {static: false}) form: NgForm;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService,
  ) {
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.returnValue = true;
    }
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data.user;
    });
  }

  updateUser() {
    this.userService
      .updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(
        (next) => {
          this.alertify.success('Profile Updated');
          this.form.reset(this.user);
        },
        (error) => {
          this.alertify.error(error);
        },
      );
  }
}
