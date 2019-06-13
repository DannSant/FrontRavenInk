import { Component, OnInit } from "@angular/core";
import { InventoryItem } from "../../models/inventoryItems";
import { InventoryService } from "../../services/inventory.service";
import { AlertService } from "src/app/services/alert.service";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/user.service";
import Drift from 'drift-zoom';

@Component({
  selector: "app-item-view",
  templateUrl: "./item-view.component.html",
  styleUrls: ["./item-view.component.css"]
})
export class ItemViewComponent implements OnInit {
  item: InventoryItem = {};
  suggestedItems: InventoryItem[] = [];
  currentPrice: number;
  imgUrl = "";
  constructor(
    public _inventoryService: InventoryService,
    public _alert: AlertService,
    public activatedRoute: ActivatedRoute,
    public _userService: UserService
  ) {}

  ngOnInit() {
    
    
   
    this.activatedRoute.params.subscribe(params => {
      let id = params.id;

      this._inventoryService.getItem(id).subscribe(resp => {
        if (resp.ok) {
          this.item = resp.data[0];
          console.log(this.item)
          if(this._userService.loggedUser){
            if (this._userService.loggedUser.is_wholesale == "0") {
              this.currentPrice = this.item.public_price;
            } else {
              this.currentPrice = this.item.wholesale_price;
            }
          }else {
            this.currentPrice = this.item.public_price;
          }


          this.getSuggetsted(id);
        }
      });
    });
  }

  getSuggetsted(id) {
    this._inventoryService.getSuggestedItems(id).subscribe(resp => {
      if (resp.ok) {
        this.suggestedItems = resp.data;
      }
      this.finishLoadingData();
    });
  }

  finishLoadingData(){
    new Drift(document.querySelector(".zoom-img"), {
      paneContainer: document.querySelector(".zoom-pane")
    });
  }

}
