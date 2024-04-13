export interface Address {
  firstName: string;
  lastName: string;
  address: string;
  addressLineTwo?: string;
  zipCode: string;
  city: string;
  country: string;
  mobilePhoneNumber: string;
  rememberAddress?: boolean;
}