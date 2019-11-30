import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 500) {
            return throwError(error.error);
          }

          if (error.status === 401) {
            return throwError('Operation Failed');
          }

          if (error.status === 400) {
            if (typeof error.error === 'string') {
              return throwError(error.error);
            }

            const serverError = error.error.errors;
            // let internalErrors = '';
            let modelStateErrors = '';

            if (serverError && typeof serverError === 'object') {
              for (const key in serverError) {
                if (serverError[key]) {
                  // modelStateErrors += serverError[key] + '\n';

                  if (serverError[key] instanceof Array) {
                    const internalErrors = serverError[key];
                    // @ts-ignore
                    for (const key2 in internalErrors) {
                      if (internalErrors[key2]) {
                        modelStateErrors +=
                          internalErrors[key2] + '\n';
                      }
                    }
                  }
                }
              }
            }

            return throwError(modelStateErrors || 'Server Error');
          }
        }
      }),
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
