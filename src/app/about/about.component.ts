import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fromEvent, interval, noop, Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const http$ = createHttpObservable('/api/courses');

    const courses$ = http$.pipe(
      map(res => Object.values(res['payload']))
    )
    
    courses$.subscribe(
      courses => console.log(courses),
      noop,
      () => console.log('completed')
    );

    const interval$ = interval(1000);
    // const sub = interval$.subscribe(val => console.log(`stream 1: ${val}`));
    // setTimeout(() => sub.unsubscribe(), 5000);

    const timer$ = timer(3000, 1000);

    const click$ = fromEvent(document, 'click');

    // click$.subscribe(
    //   evt => console.log(evt),
    //   err => console.log(err),
    //   () => console.log('completed')
    // );

    // Using built-in JavaScript api
    // document.addEventListener('click', evt => {
    //   console.log(evt);
      
    //   setTimeout(() => {
    //     console.log('timeout elapsed')

    //     let counter = 0;
    //     setInterval(() => {
    //       console.log(counter);
    //       counter++;
    //     }, 1000);
    //   }, 3000);
    // });
  }
}
