import * as functions from 'firebase-functions';
import { sendEmail, MailOptions } from '../modules/mail';
import { APP_NAME } from '../constants/app.name';
/**
 * method for sending welcome email to subscriber
 */
export function respondToSubscriber() {
    return functions.firestore
        .document(`subscribers/{subscriberId}`)
        .onCreate((snap, context) => {
            let user: any;
            if (snap.exists) {
                user = snap.data();
                return sendSubscriberWelcomeEmail(user.email)
                    .catch(err => console.log('error subscribing user', err));
            } else {
                return null;
            }
        });
}


async function sendSubscriberWelcomeEmail(email: string) {
    const mailOptions: MailOptions = {
        from: `"Tai-Dye Studios" hello@tai-dye-studios.com`,
        to: email,
        subject: `👋 Thanks for subscribing to ${APP_NAME} updates!`,
        text: `This is going to be a fantastic summer! Can you feel it?\n\nCompared to last year just about anything is better, but we really have a feeling about this year.\n\nAdd the fact that our online shop is officially up and running, we are offering FREE SHIPPING on orders over $100!!\n\nIt just doesn\'t get better than this....or does it???\n\nWe are giving all our subscribers 10% off their next purchase!!\n\n Use coupon code -- ILUVTDS --\n\nStay tuned for more exciting news, our very first newsletter, and be the first to hear about sales and featurd items!\n\nDon\'t miss out!`
    };

    // The user subscribed to updates and the newsletter, send welcome email to user.
    await sendEmail(mailOptions);
    return null;
}