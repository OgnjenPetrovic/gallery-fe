import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    });
  }

  login() {
    this.auth.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .subscribe(
        () => {
          this.router.navigateByUrl('/');
        },
        (err: HttpErrorResponse) => {
          alert(`${err.error.error}`);
        }
      );
  }
}
