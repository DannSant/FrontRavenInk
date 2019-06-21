import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { InventoryListsService } from 'src/app/services/inventory-lists.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styles: []
})
export class BannerComponent implements OnInit {

  carouselItems:any[]=[]
  constructor( 
    public _userService:UserService,
    public _inventoryListsService:InventoryListsService
    ) { }

  ngOnInit() {
    this._inventoryListsService.getCarouselItems().subscribe((resp:any)=>{
      
      if(resp.ok){
        this.carouselItems=resp.data;
      }
    })
  }

}
