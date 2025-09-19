import { Pipe, PipeTransform } from '@angular/core';
import { CourseCategory } from '../../core/models/object-model';

@Pipe({ name: 'categoryFilter', standalone: true })
export class CategoryFilterPipe implements PipeTransform {
  transform(courses: any[], categoryId: number): any[] {
    console.log(courses);
    console.log(categoryId);
    
    
    if (!courses || !categoryId) return courses;
    return courses.filter((c) => c.courseCategoryId === categoryId);
  }
}
