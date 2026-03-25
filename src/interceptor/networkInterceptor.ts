import { FetchInterceptor } from './fetchInterceptor';
import { XHRInterceptor } from './xhrInterceptor';

export class NetworkInterceptor {
  public static install(callback: (log: any) => void) {
    FetchInterceptor.install(callback);
    XHRInterceptor.install(callback);
  }
}
