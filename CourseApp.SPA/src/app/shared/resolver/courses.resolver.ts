import { ResolveFn, Router } from '@angular/router';
import { Courses } from '../../core/models/object-model';
import { inject } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { UserService } from '../services/user.service';
import { CoursesService } from '../services/courses.service';
import { catchError, of } from 'rxjs';
import { PaginatedResult } from '../../core/models/pagination';

export const coursesResolver: ResolveFn<PaginatedResult<Courses[]> | null> = (
  route,
  state
) => {
  const coursesService = inject(CoursesService);
  const alertifyService = inject(AlertifyService);
  const router = inject(Router);
  const courseCategoryId = 1;
  const courseParams: any = { courseCategoryId };
  const pageNumber =1;
  const pageSize = 5;

  return coursesService.getAllCourses(pageNumber, pageSize, courseParams).pipe(
    catchError((error) => {
      alertifyService.error('problem recieving data');
      router.navigate(['/home']);
      return of(null);
    })
  );
};
