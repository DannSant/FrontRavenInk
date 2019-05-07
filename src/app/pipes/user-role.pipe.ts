import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userRole'
})
export class UserRolePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let returnValue = "";
    if(value=='1'){
      returnValue="Administrador";
    }else if(value=='2'){
      returnValue="Usuario";
    }else if(value=='3'){
      returnValue="Usuario mayoreo";
    }
    return returnValue;
  }

}
