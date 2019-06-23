import { Component, OnInit } from "@angular/core";
import { AlertService } from "../../services/alert.service";
import { InventoryService } from "../../services/inventory.service";
import { ActivatedRoute, Router } from "@angular/router";
import { InventoryItem } from "../../models/inventoryItems";
import { LanguageConfigService } from '../../services/language-config.service';

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styles: []
})
export class SearchComponent implements OnInit {
  items: InventoryItem[] = [];
  searchTerm: string = "";
  constructor(
    public _alert: AlertService,
    public _inventory: InventoryService,
    public activatedRoute: ActivatedRoute,
    public _languageService:LanguageConfigService,
    public router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.searchTerm = params.term;
      this._inventory.searchItems(this.searchTerm).subscribe((resp: any) => {
        if (resp.ok) {
          this.items = resp.data;
        }
      });
    });
  }
}
