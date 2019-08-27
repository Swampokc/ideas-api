import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor<any, any> {
  intercept(
    context: ExecutionContext,
    calls: CallHandler<any>,
  ): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;
    const now = Date.now();
    return calls
      .handle()
      .pipe(
      tap(() =>
        Logger.log(
          `${method} ${url} ${Date.now() - now}ms`,
          `${context.getClass().name}.${context.getHandler().name}`,
          ),
      ),
    );
  }
}
