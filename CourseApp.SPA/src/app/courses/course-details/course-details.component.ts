import { Component, inject } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Courses } from '../../core/models/object-model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { AlertifyService } from '../../shared/services/alertify.service';
import { CoursesService } from '../../shared/services/courses.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [TabsModule, DatePipe,CommonModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  alertifyService = inject(AlertifyService);
  coursesService = inject(CoursesService);
  authService = inject(AuthService);
  course!: Courses;

  constructor() {
    this.loadCourse();
  }
  loadCourse() {
    this.course = this.route.snapshot.data['course'];
  }
  calcCourseDuration() {
    //return this.course.endDate-this.course.startDate;
  }
  subscribeCourse(id: number) {
    if (!this.authService.loggedin()) {
      this.router.navigateByUrl('/login');
    } else {
      this.alertifyService.confirm(
        'Are you sure you want to subscribe in this course?',
        () => {
          this.coursesService
            .subscribeCourse(+this.authService.decodedToken.nameid, id)
            .subscribe(
              () => {
                this.alertifyService.success('Course registered successfully');
              },
              (error) => {
                this.alertifyService.error(error);
              }
            );
        }
      );
    }
  }
}
