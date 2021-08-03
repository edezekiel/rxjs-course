import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Course } from "../model/course";
import { createHttpObservable } from "../common/util";

@Injectable({
  providedIn: "root",
})
export class Store {
  private subject = new BehaviorSubject<Course[]>([]);

  courses$: Observable<Course[]> = this.subject.asObservable();
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  init() {
    const http$: Observable<any> = createHttpObservable("/api/courses");

    http$.pipe(
      tap(() => console.log("HTTP request executed")),
      map((res) => Object.values(res["payload"])),
    ).subscribe((courses: Course[]) => this.subject.next(courses));
  }

  selectBeginnerCourses() {
    return this.filterByCategory('BEGINNER')
  }

  selectAdvancedCourses() {
    return this.filterByCategory('ADVANCED')
  }

  filterByCategory(category: string) {
    return this.courses$.pipe(
      map(courses => courses.filter(c => c.category === category))
    )
  }
}
