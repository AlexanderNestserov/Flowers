import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';
import { PasswordMatchChangeVaildator } from './passwordmatch-change';
import {
  divTrigger,
  divTriggerError,
} from '../popup-success-error/popupSuccessError.animations';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

enum ClickedDivState {
  hide = 'hide',
  show = 'show',
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [divTrigger, divTriggerError],
})
export class AccountComponent implements OnInit {
  clickedDivState: ClickedDivState = ClickedDivState.hide;
  clickedDivStateError: ClickedDivState = ClickedDivState.hide;
  isDisabled = false;
  isDisabledPassword = false;
  isFormShow = false;
  getUserData: Observable<any> = this.http.getUserData();
  error: any;
  errorPassword: any;
  keycloakLogoutOption = environment.keycloakLogoutOption;
  isLoggedIn = false;

  formValue: FormGroup = this.formbuilder.group({
    firstName: ['', [Validators.required, Validators.maxLength(255)]],
    lastName: ['', [Validators.required, Validators.maxLength(255)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[\+\][0-9]{12}$/)]],
    homeAddress: ['', [Validators.maxLength(255)]],
    additionalInformation: ['', [Validators.maxLength(255)]],
  });

  formChangePassword: FormGroup = this.formbuilder.group(
    {
      oldPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g
          ),
        ],
      ],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g
          ),
        ],
      ],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    { validators: this.passwordMatchValidator.validate }
  );

  constructor(
    private formbuilder: FormBuilder,
    private passwordMatchValidator: PasswordMatchChangeVaildator,
    private http: AccountService,
    private readonly keycloak: KeycloakService
  ) {}

  async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    this.getUserData.subscribe((error) => {
      this.error = error;
    });
  }

  showError() {
    const { touched, invalid, errors } = this.confirmPassword;
    return (
      (touched && invalid && errors) ||
      this.formChangePassword.errors?.['noMatchingPassword']
    );
  }

  get firstName() {
    return this.formValue.get('firstName') as FormControl;
  }
  get lastName() {
    return this.formValue.get('lastName') as FormControl;
  }
  get email() {
    return this.formValue.get('email') as FormControl;
  }
  get phone() {
    return this.formValue.get('phone') as FormControl;
  }
  get homeAddress() {
    return this.formValue.get('homeAddress') as FormControl;
  }
  get additionalInformation() {
    return this.formValue.get('additionalInformation') as FormControl;
  }

  postUserDetails() {
    this.isDisabled = true;
    this.http.patchData({ ...this.formValue.value }).subscribe({
      next: () => {
        this.clickedDivState = ClickedDivState.show;
      },
      error: () => {
        this.clickedDivStateError = ClickedDivState.show;
      },
    });
    this.isDisabled = false;
    this.clickedDivState = ClickedDivState.hide;
    this.clickedDivStateError = ClickedDivState.hide;
  }

  get oldPassword() {
    return this.formChangePassword.get('oldPassword') as FormControl;
  }
  get newPassword() {
    return this.formChangePassword.get('newPassword') as FormControl;
  }
  get confirmPassword() {
    return this.formChangePassword.get('confirmPassword') as FormControl;
  }

  postChangePassword() {
    this.isDisabledPassword = true;
    this.http
      .postChangePassword({ ...this.formChangePassword.value })
      .subscribe({
        next: () => {
          this.clickedDivState = ClickedDivState.show;
          this.formChangePassword.reset();
          this.errorPassword = '';
        },
        error: (error) => {
          this.clickedDivStateError = ClickedDivState.show;
          this.errorPassword = error.error;
        },
      });
    this.isDisabledPassword = false;
    this.clickedDivState = ClickedDivState.hide;
    this.clickedDivStateError = ClickedDivState.hide;
  }

  isChangePasswordShow() {
    this.isFormShow = !this.isFormShow;
  }

  closeMenu() {
    this.clickedDivState = ClickedDivState.hide;
    this.clickedDivStateError = ClickedDivState.hide;
  }

  signOut() {
    if (this.isLoggedIn) {
      this.keycloak.logout(this.keycloakLogoutOption);
    }
  }
}
