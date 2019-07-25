import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryItem } from '../../models/inventoryItems';
import { InventoryService } from 'src/app/services/inventory.service';
import { LanguageConfigService } from '../../services/language-config.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.styles.css']
})
export class CatalogComponent implements OnInit {

  items: InventoryItem[] = [];
  subcategory: string = "";
  subcategoryName:string="";
  subcategoryNameEnglish:string="";
  finishedLoading: boolean = false;
  subcategoryId:number=0;

  constructor(
    public _alert: AlertService,
    public _inventory: InventoryService,
    public _subcategory: SubcategoryService,
    public activatedRoute: ActivatedRoute,
    public _languageService:LanguageConfigService,
    public router: Router
  ) { }

  ngOnInit() {
    this.finishedLoading = false;
    this.activatedRoute.params.subscribe((params: any) => {
      let id = params.id;
      if (id == 0 || id == undefined || isNaN(id)) {
        console.error("Id no es correcto");
        console.log(id);
        this.router.navigate(["/home"]);
      }
      this.subcategoryId=id;
      this.loadSubcategory();
      this.suscribeToLanguageChange();

    })
  }

  

  loadSubcategory(){
    this._subcategory.getSubcategory(this.subcategoryId).subscribe((resp:any)=>{
      if(resp.ok){
        
        if (resp.data.length > 0) {
          this.subcategoryName = resp.data[0].name;
          this.subcategoryNameEnglish = resp.data[0].name_english;
          if (this._languageService.currentLanguage=="spanish"){
            this.subcategory = this.subcategoryName;
          }else {
            this.subcategory= this.subcategoryNameEnglish;
          }
          this.loadItems();          
        }else {
          this.finishedLoading = true;
          this.showErrorMessage();
        }
       
      }else {
        this.finishedLoading = true;
        this.showErrorMessage();
      }
    })

  }

  loadItems(){
    this._inventory.getItemsBySubcategory(this.subcategoryId).subscribe((resp: any) => {
      this.finishedLoading = true;
      if (resp.ok) {
        this.items = resp.data;        
      } else {
        this.items = [];
      }
    });

  }

  showErrorMessage(){
    if (this._languageService.currentLanguage=="spanish"){
      this._alert.showAlert("Error","La categoria que intentas encontrar no existe. No modificar la URL directamente","error");
    }else {
      this._alert.showAlert("Error","The category does not exist. Do not modify the URL directly","error");
    }
  }

  suscribeToLanguageChange(){
    this._languageService.languageObservable.subscribe((resp:any)=>{      
      if (this._languageService.currentLanguage=="spanish"){
        this.subcategory = this.subcategoryName;
      }else {
        this.subcategory= this.subcategoryNameEnglish;
      }
    })
  }
}

