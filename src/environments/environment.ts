import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { KeycloakLoginOptions } from "keycloak-js";

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.clone({
      url: environment.serverUrl + req.url
    })
    return next.handle(url)
  }
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
      window.location.origin + '/assets/silent-check-sso.html'
  },
  enableBearerInterceptor: true,
  bearerPrefix: 'Bearer'
}

export interface Env {
  production?: boolean,
  serverUrl: string,
  config: {
    url: string,
    realm: string,
    clientId: string,
  },
  initOptions: {
    onLoad: any,
    silentCheckSsoRedirectUri: any;
  },
  enableBearerInterceptor: boolean,
  bearerPrefix: string
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
