export interface TeamMemberAddress {
    street1?: string;
    street2?: string;
    city?: string;
    state?: string;
    stateOrProvince?: string;
    zipcode?: string;
};

export interface SocialLinks {
    name?: string;
    url?: string;
    icon ?: string;
    imgURL ?: string;
}

export interface TeamMemberProfile {
    [key: string]: any;
    name?: string;
    phone?: string;
    address?: TeamMemberAddress;
    email?: string;
    imgURL?: string | string[];
    socialLinks?: SocialLinks[];
    title?: 'Owner' | 'Management' | 'Associate' | string | string[];
}