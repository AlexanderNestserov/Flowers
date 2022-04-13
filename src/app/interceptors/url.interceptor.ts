import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
<<<<<<< HEAD

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let url = req.clone({
            ...req,
            url: environment.serverUrl + req.url
        })

=======
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      let url = req.clone({
          ...req,
            url: environment.serverUrl + req.url
        })
>>>>>>> af7f5584e7b3d619e5d3f6d915bc0649e434dead
        return next.handle(url);
    }
}
