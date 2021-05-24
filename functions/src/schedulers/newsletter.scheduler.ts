import * as functions from 'firebase-functions';
import { newsletterConfig as config } from '../config';
import { sendNewsletter } from '../email/newsletter.function';

export function handleScheduledNewsletter(admin: any) {
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
                            sendNewsletter(config, item)
                        })
                })
        });
}