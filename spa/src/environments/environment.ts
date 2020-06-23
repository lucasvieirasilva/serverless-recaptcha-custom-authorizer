// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  amplify: {
    Auth: {
      identityPoolId: 'eu-west-1:644e4487-c654-4ac3-8ed3-93308803c08c',
      region: 'eu-west-1'
    },
    API: {
      endpoints: [
        {
          name: "APIGatewayAPI",
          endpoint: "https://2r6p3f3of3.execute-api.eu-west-1.amazonaws.com/sandbox",
          region: 'eu-west-1'
        }
      ]
    }
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
