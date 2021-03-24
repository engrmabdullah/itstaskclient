import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filteritems'
})
export class FilteritemsPipe implements PipeTransform {

  transform(items: any[], stepno: number): any {
    if (!items) {
        return [];
    }
    if (!stepno) {
      return [];
  }
    return items.filter(item => item.stepno ===  stepno);
}

}
