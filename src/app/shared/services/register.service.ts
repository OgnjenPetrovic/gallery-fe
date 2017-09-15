import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Observer} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class RegisterService {

  constructor(private http: HttpClient) {
  }


  register(firstName: string,
        lastName: string,
        email: string,
        password: string,
        passwordConfirmation: string) {
    return new Observable((o: Observer<any>) => {
      this.http.post('http://127.0.0.1:8000/api/register', {
        'first_name': firstName,
        'last_name': lastName,
        'email': email,
        'password': password,
        'password_confirmation': passwordConfirmation,
      })
        .subscribe(
          data => {
            o.next(data);
            return o.complete();
          },
          (err) => {
            return o.error(err);
          }
        );
    });
  }
}
