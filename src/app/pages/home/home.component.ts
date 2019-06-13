import { Component, OnInit } from '@angular/core';
import { InventoryItem } from 'src/app/models/inventoryItems';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  items: InventoryItem[] = [];


  constructor(
    public _inventoryService: InventoryService
  ) { }

  ngOnInit() {
    this._inventoryService.getInventoryItemsList("most_sold").subscribe((resp: any) => {
      //console.log(resp);
      if (resp.ok) {
        this.items = resp.data;
      }
    });
  }

}
