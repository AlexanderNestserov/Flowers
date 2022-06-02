import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { RegistrationService } from './registration.service';
import {
  divTrigger,
  divTriggerError,
} from '../popup-success-error/popupSuccessError.animations';
import { PasswordMatchVaildator } from './error-form/passwordmatch';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { AccountService } from '../account/account.service';

enum ClickedDivState {
  hide = 'hide',
  show = 'show',
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: [
    './registration.component.scss',
    '../../Modules/account/input-form-style.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [divTrigger, divTriggerError],
})
export class RegistrationComponent implements OnInit {
  @ViewChild('search') input!: ElementRef;
  clickedDivState: ClickedDivState = ClickedDivState.hide;
  clickedDivStateError: ClickedDivState = ClickedDivState.hide;
  addressValue: string = '';
  formValue: FormGroup = this.formbuilder.group(
    {
      firstName: ['', [Validators.required, Validators.maxLength(255)]],
      lastName: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^[\+\][0-9]{12}$/)],
      ],
      homeAddress: ['', [Validators.maxLength(255)]],
      additionalInformation: ['', [Validators.maxLength(255)]],
      myCheckbox: [false],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/),
        ],
      ],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    { validators: this.passwordMatchValidator.validate }
  );
  isDisabled = false;
  isDialog = true;
  isChecked = false;
  keycloakLoginOption = environment.keycloakLoginOption;

  constructor(
    private api: RegistrationService,
    private formbuilder: FormBuilder,
    private passwordMatchValidator: PasswordMatchVaildator,
    private readonly keycloak: KeycloakService,
    private http: AccountService
  ) {}

  ngOnInit(): void {
    this.formValue.reset();
    this.http.mapAddress.subscribe((res: string) => {
      this.formValue.patchValue({ homeAddress: res });
    });
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
  get password() {
    return this.formValue.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.formValue.get('confirmPassword') as FormControl;
  }
  get myCheckbox() {
    return this.formValue.get('myCheckbox') as FormControl;
  }

  dialogTitle(): void {
    this.isDialog = false;
  }

  showError(): void {
    const { touched, invalid, errors } = this.confirmPassword;
    return (
      (touched && invalid && errors) ||
      this.formValue.errors?.['noMatchingPassword']
    );
  }

  postDataDetails(): void {
    this.isDisabled = true;
    this.api.postData({ ...this.formValue.value }).subscribe({
      next: () => {
        setTimeout(() => {
          this.keycloak.login(this.keycloakLoginOption);
        }, 5000);
        this.clickedDivState = ClickedDivState.show;
        this.formValue.reset();
      },
      error: () => {
        this.clickedDivStateError = ClickedDivState.show;
        this.formValue.reset();
      },
    });
    this.isDisabled = false;
    this.clickedDivState = ClickedDivState.hide;
    this.clickedDivStateError = ClickedDivState.hide;
  }

  signIn(): void {
    this.keycloak.login(this.keycloakLoginOption);
  }
  searchMapAdress(event: KeyboardEvent): void {
    this.addressValue = (event.target as HTMLInputElement).value;
    this.http.addressHTML.next(this.input);
    this.http.address.next(this.addressValue);
  }

  closeMenu(): void {
    this.clickedDivState = ClickedDivState.hide;
    this.clickedDivStateError = ClickedDivState.hide;
  }
}
