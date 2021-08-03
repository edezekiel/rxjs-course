import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  concat,
  fromEvent,
  interval,
  noop,
  observable,
  Observable,
  of,
  timer,
  merge,
  Subject,
  BehaviorSubject, 
  AsyncSubject,
  ReplaySubject
} from "rxjs";
import { delayWhen, filter, map, take, timeout } from "rxjs/operators";
import { createHttpObservable } from "../common/util";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  ngOnInit() {
    const subject = new ReplaySubject();

    const series1$ = subject.asObservable();
    const sub1 = series1$.subscribe(val => console.log('sub1:' + val));

    subject.next(1);
    subject.next(2);    
    subject.next(3);

    // subject.complete();

    setTimeout(() => {
      const sub2 = series1$.subscribe(val => console.log('sub2:' + val));
      subject.next(4);
      // subject.complete();
    }, 1000);

    // subject.complete();
  }
}
