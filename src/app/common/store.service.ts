import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { map, tap, filter } from "rxjs/operators";
import { Course } from "../model/course";
import { createHttpObservable } from "../common/util";
import { fromPromise } from "rxjs/internal-compatibility";

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

    http$
      .pipe(
        tap(() => console.log("HTTP request executed")),
        map((res) => Object.values(res["payload"]))
      )
      .subscribe((courses: Course[]) => this.subject.next(courses));
  }

  selectBeginnerCourses() {
    return this.filterByCategory("BEGINNER");
  }

  selectAdvancedCourses() {
    return this.filterByCategory("ADVANCED");
  }

  selectCourseById(courseId: number) {
    return this.courses$.pipe(
      map((courses) => courses.find((course) => course.id === courseId)),
      filter(course => !!course)
    );
  }

  filterByCategory(category: string) {
    return this.courses$.pipe(
      map((courses) => courses.filter((c) => c.category === category))
    );
  }

  saveCourse(courseId: number, changes): Observable<any> {
    // Optimistically modifying data in store
    const courses = this.subject.getValue();
    const idx = courses.findIndex((course) => course.id === courseId);
    const newCourses = courses.slice(0);
    newCourses[idx] = {
      ...courses[idx],
      ...changes,
    };
    this.subject.next(newCourses);

    // Fetch request returned as Observable
    return fromPromise(
      fetch(`/api/courses/${courseId}`, {
        method: "PUT",
        body: JSON.stringify(changes),
        headers: {
          "content-type": "application/json",
        },
      })
    );
  }
}
