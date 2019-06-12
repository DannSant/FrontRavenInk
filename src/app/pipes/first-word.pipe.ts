import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "firstWord"
})
export class FirstWordPipe implements PipeTransform {
  transform(value: string): string {
    let returnValue = "";
    let valueArray = value.split(" ");
    returnValue = valueArray[0];
    return returnValue;
  }
}
