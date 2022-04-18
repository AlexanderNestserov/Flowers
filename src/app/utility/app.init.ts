import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: environment.config,
      initOptions: environment.initOptions,
      enableBearerInterceptor: environment.enableBearerInterceptor,
      bearerPrefix: environment.bearerPrefix,
    });
}
