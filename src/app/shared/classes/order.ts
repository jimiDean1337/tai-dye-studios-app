import { Coupon } from './coupon';
import { Product } from './product';

// Order
export interface Order {
    [key: string]: any;
    orderDate?: any;
    shippingDetails?: any;
    product?: Product[];
    orderId?: any;
    orderDetails?: any;
    subTotal?: any;
    grandTotal?: any;
    salesTax?: any;
    forPickup?: boolean;
    shippingTotal?: any;
    estimatedDeliveryDate?: any;
    coupon?: Coupon;
}