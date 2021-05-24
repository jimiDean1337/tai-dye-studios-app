import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { createMailTransport } from './mail';
// Store admin auth properties
export const AdminProps = {
    email: '',
    password: ''
}

export function initializeApp() {
    admin.initializeApp(functions.config().firebase);
    const mainEmail: any = functions.config().main.email;
    const mainPassword: any = functions.config().main.password;
    const transport = createMailTransport({
        name: 'hello@tai-dye-studios.com',
        service: 'Zoho',
        email: mainEmail,
        pass: mainPassword,
    });
    AdminProps.email = mainEmail;
    AdminProps.password = mainPassword;
    return { ...AdminProps, transport, admin };
}
