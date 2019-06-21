import { Component, OnInit } from '@angular/core';
import { InventoryListsService } from 'src/app/services/inventory-lists.service';
import { AlertService } from '../../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inventory-lists',
  templateUrl: './inventory-lists.component.html',
  styles: []
})
export class InventoryListsComponent implements OnInit {

  lists: any[] = [];
  finishedLoading: boolean = false;
  constructor(
    public _alert: AlertService,
    public _inventoryListService: InventoryListsService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loadLists();
  }

  loadLists() {
    this.finishedLoading = false;
    this._inventoryListService.getInventoryListsAll().subscribe((resp: any) => {
      this.finishedLoading = true;
      if (resp.ok) {
        this.lists = Object.values(resp.data);

      }
    });
  }

}
