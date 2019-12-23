import {Component, EventEmitter, OnInit, Output,} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators,} from '@angular/forms';
import {BsDatepickerConfig} from 'ngx-bootstrap';

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
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red',
    };
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        gender: ['male'],
        username: ['', Validators.required],
        knownAs: ['', Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {validator: this.passwordMatchValidator},
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : {mismatch: true};
  }

  register(form: NgForm) {
    console.log(this.registerForm.value);
    // this.authService.register(form.form.value).subscribe(
    //   () => {
    //     this.alertify.success('Registration Successful');
    //   },
    //   (error) => {
    //     this.alertify.error(error);
    //   },
    // );
  }

  cancel() {
    this.cancelRegister.emit(false);
    // this.alertify.message('cancelled');
  }
}
