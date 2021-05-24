export interface UserAddress {
    street?: string;
    street2?: string;
    aptOrSuit?: string;
    city?: string;
    stateOrProvince?: string;
    country?: string;
    zipcode?: string;
    sameAsBilling?: boolean;
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

export class UserProfile {
    id?: string;
    displayName?: string;
    fName?: string;
    lName?: string;
    email?: string;
    phone?: string;
    address?: UserAddress;
    photoURL?: string;
    isNewUser?: boolean = true;
    isActive?: boolean = true;
    creationDate?: string | Date;

}

export const USER_PROFILE_DEFAULTS: UserProfile = {
    phone: '',
    address: {
        street: '',
        street2: '',
        aptOrSuit: '',
        city: '',
        stateOrProvince: '',
        country: '',
        zipcode: '',
        sameAsBilling: false,
    },
    photoURL: 'assets/images/icons/user-profile-default.png',
    isNewUser: true,
    isActive: true,
    creationDate: new Date(),
}
