import { Component, OnInit } from '@angular/core';
import { InventoryItem } from '../../../models/inventoryItems';
import { AlertService } from '../../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../../services/inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styles: []
})
export class InventoryComponent implements OnInit {

  inventoryItems: InventoryItem[] = [];
  finishedLoading: boolean = false;
  constructor(
    public _alert: AlertService,
    public _inventoryService: InventoryService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.finishedLoading = false;
    this._inventoryService.getInventoryItemsAll().subscribe((resp: any) => {
      this.finishedLoading = true;
      if (resp.ok) {
        this.inventoryItems = resp.data;

      }
    });
  }

  deleteItem(item: InventoryItem) {
    let id = item.id.toString();
    this._inventoryService.deleteItem(id).subscribe((resp: any) => {
      if (resp.ok) {
        this._alert.showAlert("Producto borrado", "Se ha eliminado el producto con exito", "success");
        this.loadItems();
      }
    });
  }

}
