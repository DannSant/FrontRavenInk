import { Pipe, PipeTransform } from '@angular/core';
import { InventoryItem } from '../models/inventoryItems';

@Pipe({
  name: 'languageDatabase'
})
export class LanguageDatabasePipe implements PipeTransform {

  transform(item: any, language: string, type:string): any {
    if (type="item_name"){
      return this.getItemName(item,language);
    }else if(type="item_description"){
      return this.getItemDesc(item,language);
    }
  }

  getItemName(item:InventoryItem,language:string){
    let valueToReturn:string=item.item_name;
    if (language=="spanish"){
      valueToReturn=item.item_name;
    }else if(language=="english") {
      valueToReturn=item.item_name_english;
    }
   
    return valueToReturn;
  }

  getItemDesc(item:InventoryItem,language:string){
    let valueToReturn:string=item.item_name;
    if (language=="spanish"){
      valueToReturn=item.description;
    }else if(language=="english") {
      valueToReturn=item.description_english;
    }
    return valueToReturn;
  }


}
