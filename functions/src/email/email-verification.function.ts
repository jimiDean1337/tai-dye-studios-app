import * as functions from 'firebase-functions';
import { sendEmail, MailOptions } from '../modules/mail';
import { APP_NAME } from '../constants/app.name';
// import * as Admin from 'firebase-admin';
// New Contact Response
export function sendEmailVerification(admin: any) {
    return functions.firestore
        .document(`users/{userId}`)
        .onCreate((snap, context) => {
            const resource = context.resource;
            const user: any = snap.data();
            if (snap.exists) {
                return admin.auth()
                    .generateEmailVerificationLink(user.email,
                        {
                            url: `https://tai-dye-studios.com/pages/dashboard?userId=${user.id || user.uid}`
                        })
                    .then((link: string) => {
                    return sendVerificationEmail(
                        user.email,
                        user.fName,
                        link
                    ).then(res => console.log(res))
                    .catch(err => console.log('Error! Faled to send email verification', err));

                })
            } else {
                console.log(`failed to send contact email on ${resource}`, snap, context);
                return null;
            }
        });
}

async function sendVerificationEmail(email: string, name: string, link: string) {
    const mailOptions: MailOptions = {
        from: `"Tai-Dye Studios" support@tai-dye-studios.com`,
        to: email,
        subject: `Email verified!`,
        /* TODO: Add Email Verification Template if not using Firebase Default Template */
        text: `${name}, thank you for verifying your email address.\n\nYou can now placce orders with ${APP_NAME},as well as enjoy other features available to verified customers.`
    };

    // The user subscribed to updates and the newsletter, send welcome email to user.
    await sendEmail(mailOptions);
    return null;
}