import { Pipe, PipeTransform } from '@angular/core';
import { LANGUAGES } from '../config/language.config';


@Pipe({
  name: 'language'
})
export class LanguagePipe implements PipeTransform {

  transform(label: string, language: string): string {
    return LANGUAGES[label][language];
  }

}
