import { Coupon } from './coupon';
import { Product } from './product';

// Order
export interface Order {
    orderDate?: any;
    shippingDetails?: any;
    product?: Product;
    orderId?: any;
    subTotal?: any;
    grandTotal?: any;
    salesTax?: any;
    shippingTotal?: any;
    estimatedDeliveryDate?: any;
    coupons?: Coupon | Coupon[]
}