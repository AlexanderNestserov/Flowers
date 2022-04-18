export interface AccountUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  homeAddress: string;
  additionalInformation: string;
  shippingAddress: string;
}

export interface ChangePassword {
  newPassword: string;
  oldPassword: string;
}
