export const newsletterConfig = {
    newsletterId: '001',
    schedule: '0 0 1 * *',/* Rest back to 'the first day of every month' - [0 0 1 * *] */
    collection: 'tests',
    mailOptions: {
        from: `"Tai-Dye Studios" hello@tai-dye-studios.com`,
        subject: 'Tai-Dye Studios Newsletter',
    }
}
/* TODO: Change collection to 'subcribers' before launch */
