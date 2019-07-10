import { Component, OnInit } from "@angular/core";
import { InventoryItem } from "../../models/inventoryItems";
import { InventoryService } from "../../services/inventory.service";
import { AlertService } from "src/app/services/alert.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import Drift from 'drift-zoom';
import { LanguageConfigService } from '../../services/language-config.service';
import { Rating } from '../../models/rating';
import { StarRatingComponent } from "ng-starrating";
import { RatingService } from "src/app/services/rating.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-item-view",
  templateUrl: "./item-view.component.html",
  styleUrls: ["./item-view.component.css"]
})
export class ItemViewComponent implements OnInit {
  item: InventoryItem = {};
  suggestedItems: InventoryItem[] = [];
  currentPrice: number;
  selectedImageIdx = 0;


  imageZoomArray: any[];

  rating:Rating={};
  userHasRated:boolean=false;
  ratingReadOnly:boolean=false;
  ratingsOnProduct:Rating[] = [];


  constructor(
    public _inventoryService: InventoryService,
    public _alert: AlertService,
    public activatedRoute: ActivatedRoute,
    public _userService: UserService,
    public _languageService:LanguageConfigService,
    public _ratingService:RatingService,
    public router:Router
  ) {
   
   }

  ngOnInit() {



    this.activatedRoute.params.subscribe(params => {
      let id = params.id;

      this._inventoryService.getItem(id).subscribe(resp => {
        if (resp.ok) {
          this.item = resp.data[0];
          //console.log(this.item)
          if (this._userService.loggedUser) {
            if (this._userService.loggedUser.is_wholesale == "0") {
              this.currentPrice = this.item.public_price;
            } else {
              this.currentPrice = this.item.wholesale_price;
            }
          } else {
            this.currentPrice = this.item.public_price;
          }

          this.getProductComments();
          //this.getSuggetsted(id);
        }else {
          console.log("Error al obtener item");
          console.log(resp);
        }
      });
    });
  }

  getProductComments(){
    this._ratingService.getCommentsByProduct(this.item.id).subscribe(resp=>{
      if(resp.ok){
        this.ratingsOnProduct = resp.data;
      }
      this.getUserComment();
    });
  }

  getUserComment(){
    if(!this._userService.loggedUser){
      this.getSuggetsted(this.item.id);
      return;
    }
    this._ratingService.getCommentByUserProduct(this._userService.loggedUser.id,this.item.id).subscribe(resp=>{
      if(resp.ok){
        
        this.rating = resp.data[0];       
        this.userHasRated=true;
        let ratingDate = new Date(this.rating.rating_date);       
        let currentDate = new Date();
        const diffTime = Math.abs(currentDate.getTime() - ratingDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        if(diffDays>15){
          this.ratingReadOnly=true;
        }else {
          this.ratingReadOnly=false;
        }
        
      }else {
        this.rating.rating=0;
        this.userHasRated = false;
      }

      this.getSuggetsted(this.item.id);
      
      
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

  finishLoadingData() {
    let imagesUrls = this.item.img.split(";");
    let idx = 0;
    for (let url of imagesUrls) {
      this.imageZoomArray = new Drift(document.querySelector(".zoom-img" + idx), {
        paneContainer: document.querySelector(".zoom-pane")
      });
      idx++;
    }

    this.changeImage(0);

    // this.img1 = new Drift(document.querySelector(".zoom-img"), {
    //   paneContainer: document.querySelector(".zoom-pane")
    // });
    // this.img2 = new Drift(document.querySelector(".zoom-img2"), {
    //   paneContainer: document.querySelector(".zoom-pane")
    // });
  }

  changeImage(idx: number) {
    this.selectedImageIdx = idx;
    let i = 0;
    for (let imageZoom of this.imageZoomArray) {
      if (i == idx) {
        imageZoom[i].enable();
      } else {
        imageZoom[i].disable();
      }
    }
  }

  getOpacity(idx: number) {
    //return idx==this.selectedImageIdx?'block':'none';
    return idx == this.selectedImageIdx ? '1' : '0';
  }

  getDisplay(idx) {
    return idx == this.selectedImageIdx ? 'block' : 'none';
  }

  isEmpty(obj: any) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  getOldPrice(){
    return 90;
    //let oldPrices = [80,90,100];
    //return oldPrices[Math.floor(Math.random() * oldPrices.length)];
  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    
    this.rating.rating=$event.newValue;    
    
  }
  clearForm(){
    this.rating = {};
    this.rating.rating=0;
  }

  postRating(f:NgForm){
    if (f.invalid){
      this._alert.showAlert("Error","Faltan campos por capturar","error");
      return;
    }
    if(this.rating.rating<=0){
      this._alert.showAlert("Error","Debes elegir un valor entre 1 y 5 de valoración","error");
      return;
    }

    this.rating.user_id=this._userService.loggedUser.id;
    this.rating.item_id=this.item.id;

    this._ratingService.postRatingOnProduct(this.rating).subscribe(resp =>{
      if (resp.ok){
        this._alert.showAlert("Gracias","Tu valoración se ha guardado con éxito","success");
        //this.router.navigate(["/item",this.item.id]);
        window.location.reload();
      }
    });
  }

}
