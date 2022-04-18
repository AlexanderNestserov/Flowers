import { KeycloakLoginOptions } from 'keycloak-js';
export interface Env {
  production?: boolean;
  serverUrl: string;
  config: {
    url: string;
    realm: string;
    clientId: string;
  };
  initOptions: {
    onLoad: any;
    silentCheckSsoRedirectUri: any;
    checkLoginIframe: boolean;
  };
  keycloakLoginOption: KeycloakLoginOptions;
  enableBearerInterceptor: boolean;
  bearerPrefix: string;
}

export const environment: Env = {
  production: false,
  serverUrl: 'http://172.16.16.41:15000/',
  config: {
    url: 'http://172.16.16.41:15003/auth',
    realm: 'angular_trainee',
    clientId: 'angular_trainee_client',
  },
  initOptions: {
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri:
      window.location.origin + '/assets/silent-check-sso.html',
    checkLoginIframe: true,
  },
  keycloakLoginOption: {
    redirectUri: 'http://localhost:4200/home',
  },
  enableBearerInterceptor: true,
  bearerPrefix: 'Bearer',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
