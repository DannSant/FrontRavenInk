import { Component, OnInit, Input } from '@angular/core';
import { InventoryItem } from 'src/app/models/inventoryItems';
import { InventoryService } from 'src/app/services/inventory.service';
@Component({
  selector: 'app-list-display',
  templateUrl: './list-display.component.html',
  styles: []
})
export class ListDisplayComponent implements OnInit {

  
  items: InventoryItem[] = [];
  finishedLoading: boolean = false;

  @Input('list-name') listName: string;
  @Input('list-display-name') listDisplayName: string;

  constructor(
    public _inventoryService: InventoryService
  ) { }

  ngOnInit() {
    
    this.finishedLoading = false;
    this._inventoryService.getInventoryItemsList(this.listName).subscribe((resp: any) => {
      this.finishedLoading = true;
      //console.log(resp);
      if (resp.ok) {
        this.items = resp.data;
      }
    });
  }

}
