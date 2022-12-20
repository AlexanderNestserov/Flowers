export const environment = {
  production: true,
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
  keycloakLogoutOption: 'http://localhost:4200/home',
  enableBearerInterceptor: true,
  bearerPrefix: 'Bearer',
};
