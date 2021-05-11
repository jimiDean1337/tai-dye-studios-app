import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import { SUBSCRIBER_TEMPLATE } from './subscriber.template';

// import { populateClientConsultationTemplate } from './consultation-html-templates';

// import {Mailer} from './mailer';
// import { newsletterTemplate as template } from './email.constant';

admin.initializeApp(functions.config().firebase);
const mainEmail: any = functions.config().main.email;
const mainPassword: any = functions.config().main.password;
const mailTransport: nodemailer.Transporter = nodemailer.createTransport({
    name: 'hello@stephloughman.com',
    service: 'Zoho',
    auth: {
        user: mainEmail,
        pass: mainPassword,
    },
});

// Company name to include in the emails
const APP_NAME = 'Steph Loughman | Author';

/**
 * method for sending email to subscriber
 */
exports.sendNewsletterToSubscriber = functions.firestore
    .document(`subscribers/{subscriberId}`)
    .onCreate((snap, context) => {
        let user: any;
        if (snap.exists) {
            user = snap.data();
            return sendNewSubscriberEmail(user.email)
                .then(res => console.log(res))
                .catch(err => console.log('error subscribing user', err));
        } else {
            return null;
        }
    });

async function sendNewSubscriberEmail(email: string) {
    const mailOptions: nodemailer.SendMailOptions = {
        from: `"Steph Loughman | Author" hello@stephloughman.com`,
        to: email,
        html: SUBSCRIBER_TEMPLATE
    };

    // The user subscribed to updates and the newsletter.
    mailOptions.subject = `Thanks for subscribing to the ${APP_NAME} newsletter!`;
    await mailTransport.sendMail(mailOptions);
    console.log('New subscriber email sent to:', email);
    return null;
}

exports.sendNewContactEmail = functions.firestore
    .document(`contacts/{contactId}`)
    .onCreate((snap, context) => {
        const resource = context.resource;
        const contact: any = snap.data();
        if (snap.exists) {
            return sendWelcomeToContact(
                contact.email,
                contact.name,
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

// Sends a welcome email to the new contact.
async function sendWelcomeToContact(
    email?: string,
    displayName?: string,
    /* subject?: string,
    message?: string,
    timestamp?: any */
) {
    const mailOptions: nodemailer.SendMailOptions = {
        from: `"Steph Loughman | Author" hello@stephloughman.com`,
        to: email
    };

    // The user sent a contact form.
    mailOptions.subject = `Thanks for contacting ${APP_NAME}!`;
    mailOptions.text = `Hey! Thanks for contacting me, ${displayName}! New and existing readers are why I love writing. Knowing that my stories have an impact on those who read them has such a profound effect on me. As an author, I simply write from my heart, and because of my faith, the words pour out of me, and I know this is God's love, filling me up and overflowing. I feel convicted to share this experience, and all the others with you, so that you too can feel His love.\n\n\n`;
    await mailTransport.sendMail(mailOptions);
    console.log('New contact email sent to:', email);
    return null;
}

exports.sendNewEventRequestEmail = functions.firestore
    .document(`event-requests/{requestId}`)
    .onCreate((snap, context) => {
        const resource = context.resource;
        const request: any = snap.data();
        if (snap.exists) {
            return sendRequestResponse(
                request.email,
                request.name,
                request.title,
            ).then(res => console.log(res))
                .catch(err => console.log('error adding contact', err));
        } else {
            console.log(`failed to send contact email on ${resource}`, snap, context);
            return null;
        }
    });

// Sends a welcome email to the new contact.
async function sendRequestResponse(
    email?: string,
    displayName?: string,
    title?: string
) {
    const mailOptions: nodemailer.SendMailOptions = {
        from: `"Steph Loughman | Author" hello@stephloughman.com`,
        to: email
    };

    // The user sent a contact form.
    mailOptions.subject = `Thanks for contacting ${APP_NAME}!`;
    mailOptions.text = `Hey! Thanks for the heads-up about ${title}, ${displayName}! The Steph Loughman support team will review your event, then if we decide to proceed, we will notify you to set up a call to discuss the details.\n\n\nThanks again for supporting Steph Loughman, and we hope to talk soon!`;
    await mailTransport.sendMail(mailOptions);
    console.log('New event-request response email sent to:', email);
    return null;
}
