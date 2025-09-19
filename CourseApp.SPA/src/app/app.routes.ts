import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { coursesResolver } from './shared/resolver/courses.resolver';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { courseDetailsResolver } from './shared/resolver/course-details.resolver';

import { myCoursesResolver } from './shared/resolver/my-courses.resolver';
import { authGuard } from './auth/auth.guard';
import { MyCoursesListComponent } from './my-courses/my-courses-list/my-courses.component';
import { MyCourseDetailsComponent } from './my-courses/my-course-details/my-course-details.component';
import { myCourseDetailsResolver } from './shared/resolver/my-course-details.resolver';

export const routes: Routes = [
   //{ path: '', component: HomepageComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'mycourses', component: RegisterComponent },

  {
    path: 'courses',
    component: CoursesListComponent,
    resolve: { courses: coursesResolver },
  },
  {
    path: 'courses/:id',
    component: CourseDetailsComponent,
    resolve: { course: courseDetailsResolver },
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {
        path: 'myCourses',
        component: MyCoursesListComponent,
        resolve: { myCourses: myCoursesResolver },
      },
      {
        path: 'myCourses/:id',
        component: MyCourseDetailsComponent,
        resolve: { myCourse: myCourseDetailsResolver },
      },
    ],
  },
];
