import { ResolveFn, Router } from '@angular/router';
import { Courses } from '../../core/models/object-model';
import { inject } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { UserService } from '../services/user.service';
import { CoursesService } from '../services/courses.service';
import { catchError, of } from 'rxjs';

export const courseDetailsResolver: ResolveFn<Courses | null> = (route, state) => {
  const coursesService = inject(CoursesService);
  const alertifyService = inject(AlertifyService);
  const router = inject(Router);

  return coursesService.getCoursePerId(route.params['id']).pipe(
    catchError((error) => {
      //console.log(error);
      alertifyService.error('problem recieving data');
      router.navigate(['/courses']);
      return of(null);
    })
  );
};
