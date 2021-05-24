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
        text: `It's almost time! We are getting so close to launching🚀 our new, super easy-to-use online shop. You'll be able to find all of your favorites: 👕T-shirts, 💧water bottles, 🔑keychains, and so much 🔥more... ALL ONLINE!!\n\n Shop from anywhere, anytime!!\n\n Be sure to keep an eye on your inbox for updates on 🧨new items, 🤪cray cray deals, and ✨featured collections! \n\nThe first 50 customers get a *free gift 😉!!\n\n *while supplies last, purchase is neccessary`
    };

    // The user subscribed to updates and the newsletter, send welcome email to user.
    await sendEmail(mailOptions);
    return null;
}