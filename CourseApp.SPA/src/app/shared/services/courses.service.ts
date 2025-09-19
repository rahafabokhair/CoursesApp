import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { environment } from '../../../environments/environment.development';
import { Courses } from '../../core/models/object-model';
import { PaginatedResult } from '../../core/models/pagination';
import { map, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  course_url = environment.server_url + '/api/Courses';
  my_course_url = environment.server_url + '/api/user/';
  apiService = inject(ApiService);
  constructor() {}
  getAllCourses(
    page?: any,
    itemsPerPage?: any,
    courseParams?: any
  ): Observable<PaginatedResult<Courses[]>> {
    const paginatedResult: PaginatedResult<Courses[]> = new PaginatedResult<
      Courses[]
    >();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
     if (courseParams != null) {
      params = params.append('courseCategoryId',courseParams.courseCategoryId);
    }
  
    return this.apiService.getWithResponse(this.course_url, params).pipe(
      map((response: any) => {
        paginatedResult.result = response.body;
        if (response.headers.get('pagination') != null) {
          paginatedResult.pagination = JSON.parse(
            response.headers.get('pagination')
          );
        }
        return paginatedResult;
      })
    );
  }
  getCoursePerId(id: number): Observable<Courses> {
    return this.apiService.get(this.course_url + '/' + id);
  }
  getCoursesCategory() {
    return this.apiService.get(this.course_url + '/category');
  }
  //my courses
  subscribeCourse(userId: number, courseId: number) {
    return this.apiService.post(
      this.my_course_url + userId + '/MyCourses/subscribe/' + courseId,
      {}
    );
  }
  getMyCourses(
    userId: number,
    page?: any,
    itemsPerPage?: any
  ): Observable<PaginatedResult<Courses[]>> {
    const paginatedResult: PaginatedResult<Courses[]> = new PaginatedResult<
      Courses[]
    >();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.apiService
      .getWithResponse(this.my_course_url + userId + '/MyCourses', params)
      .pipe(
        map((response: any) => {
          paginatedResult.result = response.body;
          if (response.headers.get('pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('pagination')
            );
          }
          return paginatedResult;
        })
      );
  }
  getMyCoursePerId(userId: number, courseId: number): Observable<Courses> {
    return this.apiService.get(
      this.my_course_url + userId + '/MyCourses/' + courseId
    );
  }
}
