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
  finishedLoading: boolean = false;

  constructor(
    public _inventoryService: InventoryService
  ) { }

  ngOnInit() {
    this.finishedLoading = false;
    this._inventoryService.getInventoryItemsList("most_sold").subscribe((resp: any) => {
      this.finishedLoading = true;
      //console.log(resp);
      if (resp.ok) {
        this.items = resp.data;
      }
    });
  }

}
