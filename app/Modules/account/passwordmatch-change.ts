import { Validator, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PasswordMatchChangeVaildator implements Validator {
  validate(formGroup: FormGroup) {
    const { newPassword, confirmPassword } = formGroup.value;
    if (newPassword === confirmPassword) {
      return null;
    } else {
      return { noMatchingPassword: true };
    }
  }
}
