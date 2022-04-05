import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

export function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
        keycloak.init({
            config: {
                url: 'http://172.16.16.41:15003/auth',
                realm: 'angular_trainee',
                clientId: 'angular_trainee_client',
            },
            initOptions: {
                onLoad: 'check-sso',
                silentCheckSsoRedirectUri:
                    window.location.origin + '/assets/silent-check-sso.html',
                //checkLoginIframe: true
            },
            enableBearerInterceptor: true,
            bearerPrefix: 'Bearer'
        });
}