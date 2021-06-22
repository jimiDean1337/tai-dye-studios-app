export interface Coupon {
    [key: string]: any;
    id?: string | number;
    description?: string;
    code?: string;
    type?: 'CASH' | "PERCENTAGE" | "SHIPPING";
    discount?: any;
    expiresOn?: any;
}