import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userType'
})
export class UserTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let returnValue = "";
    if(value=='1'){
      returnValue="Normal";
    }else if(value=='2'){
      returnValue="Facebook";
    }else if(value=='3'){
      returnValue="Google";
    }
    return returnValue;
  }

}
