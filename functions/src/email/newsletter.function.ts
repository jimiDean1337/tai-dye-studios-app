import { sendEmail, MailOptions } from '../modules/mail';
// import { APP_NAME } from '../constants/app.name';
import { Newsletters } from '../templates/newsletter.templates';

export function sendNewsletter(config: any, item: any) {
    console.log(`Getting ${config.collection} item`);
    const options: MailOptions = {
        from: config.mailOptions.from,
        to: item.data().email,
        subject: config.mailOptions.subject,
        html: Newsletters[`NEWSLETTER_${config.newsletterId}`]
    };
    sendEmail(options);
    return null;
}