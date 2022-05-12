import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterResponse, RegisterUserDto } from './registration.model';

@Injectable()
export class RegistrationService {
  public postUrl: string = 'users/registration';
  constructor(private http: HttpClient) {}

  postData(formValue: RegisterUserDto): Observable<RegisterResponse> {
    let body: RegisterUserDto = { ...formValue };
    return this.http.post<RegisterResponse>(this.postUrl, body);
  }
}
