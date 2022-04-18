import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountUser, ChangePassword } from './account.model';

@Injectable()
export class AccountService {
  public getUserUrl: string = 'users/user';
  patchUserUrl: string = 'users';
  postChangepassword: string = 'users/change_password';
  constructor(private http: HttpClient) {}

  getUserData(): Observable<any> {
    return this.http.get(this.getUserUrl);
  }

  patchData(formValue: AccountUser): Observable<any> {
    let body: AccountUser = { ...formValue };
    return this.http.patch(this.patchUserUrl, body);
  }

  postChangePassword(changePassword: ChangePassword): Observable<any> {
    let body: ChangePassword = { ...changePassword };
    return this.http.post(this.postChangepassword, body);
  }
}
