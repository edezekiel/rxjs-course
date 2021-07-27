import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { Observable, noop } from 'rxjs';
import { map } from 'rxjs/operators';
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
      const http$ = createHttpObservable('/api/courses');

      const courses$: Observable<Course[]> = http$.pipe(
        map(res => Object.values(res['payload']))
      );

      this.beginnersCourses$ = courses$.pipe(
        map(courses => courses.filter(course => course.category === 'BEGINNER'))
      );

      this.advancedCourses$ = courses$.pipe(
        map(courses => courses.filter(course => course.category === 'ADVANCED'))
      );
    }
}
