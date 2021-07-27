import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { Observable, noop } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  advancedCourses$: Observable<Course[]>;
  beginnersCourses$: Observable<Course[]>;

    constructor() {
    }

    ngOnInit() {
      const http$: Observable<Course[]> = createHttpObservable('/api/courses');

      const courses$ = http$.pipe(
        tap(() => console.log('http request executed')),
        map(res => Object.values(res['payload'])),
        shareReplay()
      );

      this.beginnersCourses$ = courses$.pipe(
        map((courses: Course[]) => courses.filter(course => course.category === 'BEGINNER'))
      );

      this.advancedCourses$ = courses$.pipe(
        map((courses: Course[]) => courses.filter(course => course.category === 'ADVANCED'))
      );
    }
}
