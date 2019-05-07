import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userWholesale'
})
export class UserWholesalePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let returnValue = "";
    if(value=='1'){
      returnValue="SI";
    }else {
      returnValue="NO";
    }
    return returnValue;
  }

}
