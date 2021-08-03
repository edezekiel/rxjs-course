import { Observable } from 'rxjs';

export function createHttpObservable(url: string): Observable<any> {
  return new Observable(observer => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url, { signal })
      .then(res => res.ok ? res.json() : observer.error('Request failed: ' + res.status))
      .then(body => {
        observer.next(body);
        observer.complete();
      })
      .catch(err => observer.error(err));

    return () => controller.abort();
  });
}