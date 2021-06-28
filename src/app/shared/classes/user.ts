import { Order } from './order';

export interface UserAddress {
    street?: string;
    city?: string;
    stateOrProvince?: string;
    country?: string;
    zipcode?: string;
}

export interface PaymentMethod {
    [key: string]: any;
    type?: 'credit/debit' | 'paypal';
    cardNumber?: string;
    exp?: string;
    securityCode?: string;
}

export class UserAccount {
    billingAddress?: UserAddress;
    paymentMethod: PaymentMethod;
    fullName?: string;
}

export class UserOrderHistory implements Order {
    [key: string]: any;
}

export class UserProfile {
    [key: string]: any;
    id?: string;
    displayName?: string;
    fName?: string;
    lName?: string;
    email?: string;
    phone?: string;
    address?: UserAddress;
    billing?: UserAddress;
    photoURL?: string;
    isNewUser?: boolean = true;
    isActive?: boolean = true;
    creationDate?: string | Date;
    providerType?: string = 'password';
    emailVerified?: boolean = false;
    additionalUserInfo?: any;
}

export const USER_PROFILE_DEFAULTS: UserProfile = {
    phone: '',
    address: {
        street: '',
        city: '',
        stateOrProvince: '',
        country: '',
        zipcode: '',
    },
    photoURL: 'assets/images/icons/user-profile-default.png',
    isNewUser: true,
    isActive: true,
    creationDate: new Date(),
}
