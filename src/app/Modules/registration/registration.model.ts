export interface RegisterUserDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  homeAddress: string;
  additionalInformation: string;
  password: string;
  shippingAddress: string;
}

export interface RegisterResponse {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  homeAddress: string;
  additionalInformation: string;
  id: number;
  shippingAddress: string;
}
