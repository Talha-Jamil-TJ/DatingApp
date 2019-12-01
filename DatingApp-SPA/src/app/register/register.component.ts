import {Component, EventEmitter, OnInit, Output,} from '@angular/core';
import {NgForm} from '@angular/forms';

import {AuthService} from '../_services/auth.service';
import {AlertifyService} from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
  ) {
  }

  ngOnInit() {
  }

  register(form: NgForm) {
    this.authService.register(form.form.value).subscribe(
      () => {
        this.alertify.success('Registration Successful');
      },
      (error) => {
        this.alertify.error(error);
      },
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
    // this.alertify.message('cancelled');
  }
}
