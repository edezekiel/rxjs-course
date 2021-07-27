import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { concat, fromEvent, interval, of, timer } from 'rxjs';
@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // concat operator
    const source1$ = of([1, 2, 3]);
    const source2$ = of([4, 5, 6]);
    const source3$ = of([7, 8, 9])
    const result$ = concat(source1$, source2$, source3$);
    result$.subscribe(console.log);

    // Observables
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

    // JavaScript api
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
