import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import {KeycloakInitOptions, KeycloakOnLoad} from "keycloak-js";

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: environment.config,
      initOptions: environment.initOptions as KeycloakInitOptions,
      enableBearerInterceptor: environment.enableBearerInterceptor,
      bearerPrefix: environment.bearerPrefix,
    });
}
