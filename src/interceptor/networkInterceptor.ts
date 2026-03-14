import { XHRInterceptor } from './xhrInterceptor';

export class NetworkInterceptor {
  public static install(callback: (log: any) => void) {
    XHRInterceptor.install(callback);
  }
}
