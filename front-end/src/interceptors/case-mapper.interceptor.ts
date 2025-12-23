import { HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import camelcaseKeys from 'camelcase-keys';
import { map, Observable } from 'rxjs';
import snakecaseKeys from 'snakecase-keys';

export function caseMapperInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const snakeBody = req.body ? snakecaseKeys(req.body as Record<string, unknown>, { deep: true }) : req.body;
  const mappedRequest = req.clone({ body: snakeBody });

  return next(mappedRequest).pipe(
    map(event => event instanceof HttpResponse && event.body ? event.clone({ body: camelcaseKeys(event.body, { deep: true }) }) : event)
  );
}
