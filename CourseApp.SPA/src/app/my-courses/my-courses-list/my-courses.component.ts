import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Courses } from '../../core/models/object-model';
import { CategoryNamePipe } from '../../shared/pipes/category-name.pipe';
import { CoursesService } from '../../shared/services/courses.service';
import { PaginatedResult, Pagination } from '../../core/models/pagination';
import { AlertifyService } from '../../shared/services/alertify.service';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-my-courses-list',
  standalone: true,
  imports: [
    CategoryNamePipe,
    RouterLink,
    FormsModule,
    PaginationModule,
    CommonModule,
  ],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css',
})
export class MyCoursesListComponent {
  route = inject(ActivatedRoute);
  coursesService = inject(CoursesService);
  alertifyService = inject(AlertifyService);
  authService = inject(AuthService);
  myCourses: Courses[] = [];

  courseCategory = [];
  pagination!: Pagination;
  constructor() {
    this.pagination = this.route.snapshot.data['myCourses'].pagination;
    this.myCourses = this.route.snapshot.data['myCourses'].result;

    this.getAllCategories();
  }
  loadCourses() {
    this.coursesService
      .getMyCourses(
        this.authService.decodedToken.nameid,
        this.pagination.currentPage,
        this.pagination.itemsPerPage
      )
      .subscribe(
        (res: PaginatedResult<Courses[]>) => {
          this.myCourses = res.result;
          this.pagination = res.pagination;
        },
        (error) => {
          this.alertifyService.error(error);
        }
      );
  }
  getAllCategories() {
    this.coursesService.getCoursesCategory().subscribe((data) => {
      this.courseCategory = data;
    });
  }
  pageChanged(event: PageChangedEvent): void {
    this.pagination.currentPage = event.page;
    this.loadCourses();
  }
}
