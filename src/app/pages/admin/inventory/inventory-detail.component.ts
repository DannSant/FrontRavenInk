import { Component, OnInit } from '@angular/core';
import { InventoryItem } from '../../../models/inventoryItems';
import { AlertService } from '../../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../../services/inventory.service';
import { Category } from '../../../models/category';
import { Subcategory } from '../../../models/subcategory';
import { CategoryService } from '../../../services/category.service';
import { SubcategoryService } from '../../../services/subcategory.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styles: []
})
export class InventoryDetailComponent implements OnInit {
 item:InventoryItem={};
 categories:Category[]=[];
 subcategories:Subcategory[]=[];
  constructor(
    public _alert:AlertService,
    public _inventoryService:InventoryService,
    public _categoryService:CategoryService,
    public _subcategoryService:SubcategoryService,
    public router:Router,
    public activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loadCatalogs();

  }

  loadCatalogs(){
    this._categoryService.getActiveCategories().subscribe((resp:any)=>{
      if (resp.ok){
        this.categories = resp.data;
        this.loadItem();
      }
    })
  }

  loadSubcategories(category:string){
    this._subcategoryService.getSubcategoriesByCategory(category).subscribe((resp:any)=>{
      if(resp.ok){
        this.subcategories=resp.data;
      }
    })
  }

  loadItem(){
    this.activatedRoute.params.subscribe((params:any)=>{
      let itemId = params.id;

      if (itemId=='new'){
        this.cleanForm();
        return;
      }
      if(!itemId){
        this._alert.showAlert("Error","No se ha recibido un id de item, favor de ingresar correctamente desde la opcion Iventario","error");
        this.router.navigate(["/inventory"]);
        return;
      }



      this._inventoryService.getItem(itemId).subscribe((resp:any)=>{

        if(resp.ok){
          this.loadSubcategories(resp.data[0].category);
          this.item=resp.data[0];

        }
      });
    });
  }

  cleanForm(){
    this.item={};
    this.subcategories=[];
  }

  saveItem(f:NgForm){
    if(f.invalid){
      this._alert.showAlert("Error","No se han capturados todos los campos, favor de verificar los campos con asterico (*) ya que son obligatorios","error");
      return;
    }

    this._inventoryService.saveItem(this.item).subscribe((resp:any)=>{
      if(resp.ok){
        this._alert.showAlert("Item guardado","El producto se ha guardado con exito","success");
        this.router.navigate(['/inventory']);
      }else {
        console.warn(resp);
        this._alert.showAlert("Error","No se ha logrado guarda con exito el item, favor de verificar los campos y haber iniciado sesion correctamente","error");
      }
    });
  }

}
