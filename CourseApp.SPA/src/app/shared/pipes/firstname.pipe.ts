import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstname',
  standalone: true
})
export class FirstnamePipe implements PipeTransform {

  transform(categories: string): unknown {
    const firstname=categories.slice(0,2);
    return firstname;
  }

}
