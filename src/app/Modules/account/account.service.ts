import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountUser, ChangePassword, PatchUser } from './account.model';

@Injectable()
export class AccountService {
  public getUserUrl: string = 'users/user';
  public getTempIdUrl: string = 'users/tempid';
  patchUserUrl: string = 'users';
  postChangepassword: string = 'users/change_password';

  public addressHTML = new BehaviorSubject<ElementRef>({} as ElementRef);
  public address = new BehaviorSubject<string>('');
  public mapAddress = new BehaviorSubject<string>('');
  constructor(private http: HttpClient) {}

  getUserData(): Observable<AccountUser> {
    return this.http.get<AccountUser>(this.getUserUrl);
  }

  patchData(formValue: AccountUser): Observable<PatchUser> {
    let body: AccountUser = { ...formValue };
    return this.http.patch<PatchUser>(this.patchUserUrl, body);
  }

  postChangePassword(
    changePassword: ChangePassword
  ): Observable<ChangePassword> {
    let body: ChangePassword = { ...changePassword };
    return this.http.post<ChangePassword>(this.postChangepassword, body);
  }

  getTempId(): Observable<string> {
    return this.http.get(this.getTempIdUrl, {
      responseType: 'text',
    });
  }
}
