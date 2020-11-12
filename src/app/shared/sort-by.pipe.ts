import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'underscore';


@Pipe({
  name: 'sortBy',
  pure: false
})
export class SortByPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any {
    let arr = value;
    arr = _.sortBy(arr, 'name')
    return arr;
  }

}
