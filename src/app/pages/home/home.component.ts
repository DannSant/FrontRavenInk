import { Component, OnInit } from '@angular/core';
import { InventoryItem } from 'src/app/models/inventoryItems';
import { InventoryService } from 'src/app/services/inventory.service';
import { InventoryListsService } from 'src/app/services/inventory-lists.service';
import { LanguageConfigService } from '../../services/language-config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

 

  lists:any[]=[];

  constructor(
    public _inventoryListsService: InventoryListsService,
    public _languageService:LanguageConfigService
  ) { }

  ngOnInit() {
   
    this._inventoryListsService.getInventoryListsAll().subscribe((resp: any) => {
      
      //console.log(resp);
      if (resp.ok) {
        
        this.lists = Object.values(resp.data);
        //this.lists = resp.data;
      }
    });
  }

  getDisplayName(list){
    let displayName=list.display_name;
    if(this._languageService.currentLanguage=="spanish"){
      displayName=list.display_name;
    } else if(this._languageService.currentLanguage=="english"){
      displayName=list.display_name_english;
    }     
    return displayName;
  }

}
