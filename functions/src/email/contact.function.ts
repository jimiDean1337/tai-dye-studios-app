import * as functions from 'firebase-functions';
import { sendEmail, MailOptions } from '../modules/mail';
import { APP_NAME } from '../constants/app.name';
// New Contact Response
export function respondToContact() {
    return functions.firestore
        .document(`contacts/{contactId}`)
        .onCreate((snap, context) => {
            const resource = context.resource;
            const contact: any = snap.data();
            if (snap.exists) {
                return sendWelcomeToContact(
                    contact.email,
                    contact.fName,
                    /* contact.subject,
                    contact.message,
                    contact.timestamp */
                ).then(res => console.log(res))
                    .catch(err => console.log('error adding contact', err));
            } else {
                console.log(`failed to send contact email on ${resource}`, snap, context);
                return null;
            }
        });

}


// Sends a welcome email to the new contact.
async function sendWelcomeToContact(
    email?: string,
    fName?: string,
    appName?: string
    /* subject?: string,
    message?: string,
    timestamp?: any */
) {
    const mailOptions: MailOptions = {
        from: `"Tai-Dye Studios" hello@tai-dye-studios.com`,
        to: email,
        subject: `👋 Hey there, ${fName || 'Friend'}!`,
        text: `Things are pretty exciting here at ${APP_NAME} as we prepare to launch our new online shop.\n\n Since we are a small business, we don't have much staff, but we will do our absolute best to reach out to answer any questions you might have, or simply to reply to your message.\n\n\nThanks for your interest, and be sure to bookmark tai-dye-studios.com.\n\nCome back soon!`
    };

    await sendEmail(mailOptions);
    console.log('New contact email sent to:', email);
    return null;
}