import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../models/inventoryItems';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-cart-review',
  templateUrl: './cart-review.component.html',
  styles: []
})
export class CartReviewComponent implements OnInit {
  item:InventoryItem={};
  existance:number=0;
  constructor(
    public _userService:UserService,
    public _inventoryService:InventoryService,
    public _alert:AlertService,
    public router:Router,
    public activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params)=>{
      let id=params.id;
      if(!this._userService.loggedUser){
        this.router.navigate(["/login",'cart',id])
      }else {
        this._inventoryService.getItem(id).subscribe(resp=>{
        
          if(resp.ok){
            this.item=resp.data[0];
          }
        });
      }
    });
    
  }

  validateExistance(event){
    console.log(this.existance);
    if(this.existance>this.item.existance){
      this.existance=this.item.existance;
      this._alert.showAlert("Error","No puedes seleccionar mas de " + this.item.existance + " producto(s)","error")
      //event.preventDefault()
     
    }
  }

  checkoutPage(){
    if(this.existance>this.item.existance){
      this.existance=this.item.existance;
      this._alert.showAlert("Error","No puedes seleccionar mas de " + this.item.existance + " producto(s)","error")
      //event.preventDefault()
     
    }
    this.router.navigate(['/checkout',this.existance,this.item.id])
  }

}
