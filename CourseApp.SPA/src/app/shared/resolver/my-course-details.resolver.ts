import { ResolveFn, Router } from '@angular/router';
import { Courses } from '../../core/models/object-model';
import { inject } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { UserService } from '../services/user.service';
import { CoursesService } from '../services/courses.service';
import { catchError, of } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

export const myCourseDetailsResolver: ResolveFn<Courses | null> = (
  route,
  state
) => {
  const coursesService = inject(CoursesService);
  const alertifyService = inject(AlertifyService);
  const router = inject(Router);
  const authService = inject(AuthService);
  const userId = authService.userId;
  if (!userId) {
   // alertifyService.error('problem recieving data');
      router.navigate(['/home']);
      return of(null);
  }
  return coursesService.getMyCoursePerId(+userId,route.params['id']).pipe(
    catchError((error) => {
      alertifyService.error('problem recieving data');
      router.navigate(['/home']);
      return of(null);
    })
  );
};
