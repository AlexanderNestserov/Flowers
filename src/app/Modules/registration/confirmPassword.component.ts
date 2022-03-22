import { FormGroup } from "@angular/forms";

export class ConfirmPassword {


    passwordConfirming(frm: FormGroup) {
        return frm.controls['password'].value === frm.controls['confirmPassword'].value ? null : { 'mismatch': true };
    }


}