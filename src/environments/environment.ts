// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
/* TODO: Set Paypal token */
export const environment = {
  production: false,
  instagram_token: 'INSTAGRAM_TOKEN',
  twitter_token: 'TWITTER_TOKEN',
  facebook_token: 'FACEBOOK_TOKEN',
  stripe_token: 'STRIPE_TOKEN',
  paypal_token: 'PAYPAL_TOKEN',
  firebase_config: {
    apiKey: "API_KEY",
    authDomain: "tai-dye-studios.firebaseapp.com",
    projectId: "tai-dye-studios",
    storageBucket: "tai-dye-studios.appspot.com",
    messagingSenderId: "381639159194",
    appId: "1:381639159194:web:b7217cf9f620c480135e23",
    measurementId: "G-V9367K1SYE"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
