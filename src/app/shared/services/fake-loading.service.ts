import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeLoadingService {

  constructor() { }

  loadingWithPromise(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if(i === 3) {
          clearInterval(interval);
          if(email === 'test@gmail.com' && password === 'testpw') {
            resolve(true);
          } else {
            reject(false);
          }
        }
      }, 1000);
    });
  }

  loadingWithObservable(email: string, password: string): Observable<string> {
    return new Observable((subscriber: Subscriber<string>) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if(i === 3) {
          clearInterval(interval);
          if(email === 'test@gmail.com' && password === 'testpw') {
            subscriber.next('Sikeres bejelentkezés');
            subscriber.complete();
          } else {
            subscriber.error('Kérem ellenőrizze az email-t illetve a jelszót!');
          }
        }
      }, 1000);
    });
  }
}
