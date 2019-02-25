import { Component, OnInit } from '@angular/core';
import { InventoryItem } from '../../models/inventoryItems';
import { InventoryService } from '../../services/inventory.service';
import { AlertService } from 'src/app/services/alert.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styles: []
})
export class ItemViewComponent implements OnInit {

  item:InventoryItem={};
 

  constructor(
    public _inventoryService:InventoryService,
    public _alert:AlertService,
    public activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params)=>{
      let id=params.id;
      this._inventoryService.getItem(id).subscribe(resp=>{
        
        if(resp.ok){
          this.item=resp.data[0];
        }
      });
    });

  }

}
