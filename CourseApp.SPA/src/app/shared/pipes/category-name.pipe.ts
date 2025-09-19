import { Pipe, PipeTransform } from '@angular/core';
import { CourseCategory } from '../../core/models/object-model';

@Pipe({
  name: 'categoryName',
  standalone: true
})
export class CategoryNamePipe implements PipeTransform {

   transform(categoryId: number, categories: CourseCategory[]): string {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  }

}
