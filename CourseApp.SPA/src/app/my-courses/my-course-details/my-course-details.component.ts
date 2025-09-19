import { Component, inject } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CourseCategory, Courses } from '../../core/models/object-model';
import { CoursesService } from '../../shared/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-course-details',
  standalone: true,
  imports: [TabsModule,CommonModule],
  templateUrl: './my-course-details.component.html',
  styleUrl: './my-course-details.component.css',
})
export class MyCourseDetailsComponent {
  courseCategory: CourseCategory[] = [];
  coursesService = inject(CoursesService);
  route = inject(ActivatedRoute);
  course!: Courses;
  constructor() {
    this.loadCourse();
   
  }
  loadCourse() {
    this.course = this.route.snapshot.data['myCourse'];
  
  }
 
}
