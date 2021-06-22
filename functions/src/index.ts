import { initializeApp } from './modules/init';
import { respondToContact } from './email/contact.function';
import { respondToSubscriber } from './email/subscriber.function';
import { handleScheduledNewsletter } from './schedulers/newsletter.scheduler';
import { orderConfirmation } from './email/order.function';


// HTML Templates
// import { WELCOME_TEMPLATE } from './templates/subscriber.template';

// Init Firebase then return admin auth credentials
const { admin } = initializeApp();

/**
 * method for scheduling newsletter emails
 */
exports.scheduleNewsletter = handleScheduledNewsletter(admin);

/**
 * method for sending welcome email to subscriber
 */
exports.sendSubscriberWelcome = respondToSubscriber()

/**
 * method for sending response to contact
 */
exports.sendNewContactEmail = respondToContact();

/**
 * method for sending a new order confirmation to customer
 */
exports.sendOrderConfirmation = orderConfirmation();

/* TODO: Create methods for:
    email verification
    account registration
    order placed
    profile updated

*/
