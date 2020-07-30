import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sanitizeHtmlnpm'
})
export class SanitizeHtmlnpmPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
