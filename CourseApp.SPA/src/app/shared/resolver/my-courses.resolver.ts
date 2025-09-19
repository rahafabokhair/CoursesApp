import { ResolveFn, Router } from '@angular/router';
import { Courses } from '../../core/models/object-model';
import { inject } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { UserService } from '../services/user.service';
import { CoursesService } from '../services/courses.service';
import { catchError, of } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { PaginatedResult } from '../../core/models/pagination';

export const myCoursesResolver: ResolveFn<PaginatedResult<Courses[]> | null> = (
  route,
  state
) => {
  const coursesService = inject(CoursesService);
  const alertifyService = inject(AlertifyService);
  const router = inject(Router);
  const authService = inject(AuthService);
  const userId = authService.userId;

  const pageNumber=1; 
  const pageSize=5; 
  if (!userId) {
    // alertifyService.error('problem recieving data');
    router.navigate(['/home']);
    return of(null);
  }
  return coursesService.getMyCourses(+userId,pageNumber,pageSize).pipe(
    catchError((error) => {
      debugger;
      alertifyService.error('problem recieving data');
      router.navigate(['/home']);
      return of(null);
    })
  );
};
