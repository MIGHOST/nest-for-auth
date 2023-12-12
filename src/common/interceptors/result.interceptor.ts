import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';

export class ResultInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => ({
        timestamp: Date.now(),
        url: request.url,
        data,
      })),
    );
  }
}
