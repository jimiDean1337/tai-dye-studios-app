import * as functions from 'firebase-functions';
import { sendEmail, MailOptions } from './mail';
import { Newsletters } from '../templates/newsletter.templates';


export function handleScheduledNewsletter(admin: any, config: { newsletterId: string, schedule: string, collection: string, mailOptions: MailOptions }) {
    return functions.pubsub.schedule(config.schedule)/* Sends once a month */
        .timeZone('America/New_York')
        .onRun((context) => {
            console.log(`On scheduler run`)
            return admin
                .firestore()
                .collection(config.collection)
                .onSnapshot((list: any) => {
                    console.log(`Collection onSnapshot list`)
                    list
                        .docs
                        .forEach((item: any) => {
                            console.log(`Getting ${config.collection} item`);
                            const options: MailOptions = {
                                from: config.mailOptions.from,
                                to: item.data().email,
                                subject: config.mailOptions.subject,
                                html: Newsletters[`NEWSLETTER_${config.newsletterId}`]
                            };
                            sendEmail(options);
                            return null;
                        })
                })
        });
}
