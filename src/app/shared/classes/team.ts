export interface TeamMemberAddress {
    street1?: string;
    street2?: string;
    city?: string;
    state?: string;
    stateOrProvince?: string;
    zipcode?: string;
};

export interface TeamMemberProfile {
    name?: string;
    phone?: string;
    address?: TeamMemberAddress;
    email?: string;
    title?: 'Owner' | 'Management' | 'Associate' | string;
}