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
                            url: `https://tai-dye-studios.com/pages/login`
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
                console.log(`failed to send verification email on ${resource}`, snap, context);
                return null;
            }
        });
}

async function sendVerificationEmail(email: string, name: string, link: string) {
    const mailOptions: MailOptions = {
        from: `"Tai-Dye Studios" support@tai-dye-studios.com`,
        to: email,
        subject: `Verification Request From ${APP_NAME}!`,
        html: `<h2>${name}, please verify your email address.</h2><br><br><p>Verification is needed to place orders and gain access to other features in ${APP_NAME}</p><br><br><p>Use this link or copy and paste it in your browser url bar:</p><br><br><p>Link: <a href="${link}">${link}</a><br><br>If you do not wish to verify your email, please note it will restrict features and services with ${APP_NAME}.`,
        /* TODO: Add Email Verification Template if not using Firebase Default Template */
    };

    // The user subscribed to updates and the newsletter, send welcome email to user.
    await sendEmail(mailOptions);
    return null;
}