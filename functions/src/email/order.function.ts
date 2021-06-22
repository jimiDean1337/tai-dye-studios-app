import * as functions from 'firebase-functions';
import { sendEmail, MailOptions } from '../modules/mail';
// import { APP_NAME } from '../constants/app.name';
import { OrderSuccessTemplate } from '../templates/order-success.template';
import { NewOrderTemplate } from '../templates/vendor-order.template';

export function orderConfirmation() {
    return functions.firestore
        .document(`orders/{orderId}`)
        .onCreate((snap, context) => {
        let orderDetails: any;
        if (snap.exists) {
            orderDetails = snap.data();
            return sendOrderConfirmation(orderDetails)
                .then(() => {
                    return sendNewOrder(orderDetails)
                })
                .catch((err: any) => console.log('error sending order confirmation', err));
        } else {
            return null;
        }
    });
}

// Send Order Confirmation to Customer
async function sendOrderConfirmation(orderDetails: any) {
    // console.log('Sending Order Confirmation', orderDetails)
    const options: MailOptions = {
        from: `"Tai-Dye Studios" orders@tai-dye-studios.com`,
        to: orderDetails.shippingDetails.email,
        subject: `Order ${orderDetails.orderId} Confirmation`,
        html: OrderSuccessTemplate(orderDetails)
    };
    await sendEmail(options);
    return null;
}

// Send Order Confirmation to Merchant
async function sendNewOrder(orderDetails: any) {
    console.log('Sending Order To Merchant', orderDetails)
    const options: MailOptions = {
        from: `"Tai-Dye Studios" orders@tai-dye-studios.com`,
        to: ['orders@tai-dye-studios.com', 'tai@tai-dye-studios.com'],
        subject: `New Customer Order ${orderDetails.orderId}`,
        html: NewOrderTemplate(orderDetails)
    };
    await sendEmail(options);
    return null;
}