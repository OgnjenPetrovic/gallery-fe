import {Component, OnInit} from '@angular/core';
import {RegisterService} from '../../shared/services/register.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private registerService: RegisterService, private router: Router, private auth: AuthService) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern(/^\D*(?:\d\D*){1,}$/)]),
      'passwordconfirmation': new FormControl(null, [Validators.required]),
      'terms': new FormControl(null, Validators.requiredTrue),
    });
  }


  register() {
    this.registerService.register(
      this.registerForm.get('firstname').value,
      this.registerForm.get('lastname').value,
      this.registerForm.get('email').value,
      this.registerForm.get('password').value,
      this.registerForm.get('passwordconfirmation').value
    ).subscribe(
        () => {
          console.log('registred');
          this.auth.login(this.registerForm.get('email').value,  this.registerForm.get('password').value)
            .subscribe(
              () => {
                this.router.navigateByUrl('/');
              },
              (err: HttpErrorResponse) => {
                alert(`${err.error.error}`);
              }
            );
        },
        (err: HttpErrorResponse) => {
          alert(`${err.error.error}`);
        }
      );
  }

  // passwordMatchValidator(g: FormGroup): { [s: string]: boolean } {
  //   if (g.get('password').value === g.get('passwordconfirmation').value) {
  //     return {'mismatch': true};
  //   }
  //   return null;
  // }
}
