import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayName',
  standalone: true
})
export class DisplayNamePipe implements PipeTransform {

  transform(value: string): string {
    let arr = value.split(' ');
    if (arr.length === 1) return value[0].toUpperCase();
    else {
      return `${arr[0][0]}${arr.at(-1)![0]}`.toUpperCase();
    }
  }

}
