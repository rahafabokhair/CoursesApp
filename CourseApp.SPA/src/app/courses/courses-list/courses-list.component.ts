import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { CourseCategory, Courses, User } from '../../core/models/object-model';
import { CoursesService } from '../../shared/services/courses.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginatedResult, Pagination } from '../../core/models/pagination';
import { AlertifyService } from '../../shared/services/alertify.service';
import { FormsModule } from '@angular/forms';
import { CategoryFilterPipe } from '../../shared/pipes/category-filter';
@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [
    TabsModule,
    PaginationModule,
    CommonModule,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css',
})
export class CoursesListComponent implements OnInit {
  @ViewChild('memberTabs') memberTabs!: TabsetComponent;

  coursesService = inject(CoursesService);
  alertifyService = inject(AlertifyService);
  route = inject(ActivatedRoute);

  courses: Courses[] = [];
  courseCategory: CourseCategory[] = [];

  pagination!: Pagination;
  courseParams: any = {};
  constructor() {}
  ngOnInit(): void {
    this.pagination = this.route.snapshot.data['courses'].pagination;
    this.courses = this.route.snapshot.data['courses'].result;
    this.courseParams.courseCategoryId = 1;
    this.getCoursesCategory();
  }

  loadCourses() {
    this.coursesService
      .getAllCourses(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.courseParams
      )
      .subscribe(
        (res: PaginatedResult<Courses[]>) => {
          this.courses = res.result;
          this.pagination = res.pagination;
        },
        (error) => {
          this.alertifyService.error(error);
        }
      );
  }
  getCoursesCategory() {
    this.coursesService.getCoursesCategory().subscribe((data) => {
      this.courseCategory = data;
    });
  }
  pageChanged(event: PageChangedEvent): void {
    this.pagination.currentPage = event.page;
    this.loadCourses();
  }

  onTabSelect(category: any) {
    this.courseParams.courseCategoryId = category.id;
    this.loadCourses();
  }
}
