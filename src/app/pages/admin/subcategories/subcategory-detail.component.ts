import { Component, OnInit } from '@angular/core';
import { Subcategory } from '../../../models/subcategory';
import { NgForm } from '@angular/forms';
import { Category } from '../../../models/category';
import { AlertService } from '../../../services/alert.service';
import { CategoryService } from '../../../services/category.service';
import { SubcategoryService } from '../../../services/subcategory.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subcategory-detail',
  templateUrl: './subcategory-detail.component.html',
  styles: []
})
export class SubcategoryDetailComponent implements OnInit {
  subcategory:Subcategory = {};
  categories:Category[]=[];
  constructor(
    public _alert:AlertService,
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
      if(resp.ok){
        this.categories=resp.data;
        this.loadSubcategory();
      }
    });
  }

  loadSubcategory(){
    this.activatedRoute.params.subscribe((params:any)=>{
      let subcategoryId = params.id;

      if (subcategoryId=='new'){
        this.cleanForm();
        return;
      }
      if(!subcategoryId){
        this._alert.showAlert("Error","No se ha recibido un id de item, favor de ingresar correctamente desde la opcion Iventario","error");
        this.router.navigate(["/inventory"]);
        return;
      }



      this._subcategoryService.getSubcategory(subcategoryId).subscribe((resp:any)=>{

        if(resp.ok){

          this.subcategory=resp.data[0];

        }
      });
    });
  }

  cleanForm(){
    this.subcategory={};
  }

  saveSubcategory(f:NgForm){
    if(f.invalid){
      this._alert.showAlert("Error","No se han capturados todos los campos, favor de verificar los campos con asterico (*) ya que son obligatorios","error");
      return;
    }

    this._subcategoryService.saveSubcategory(this.subcategory).subscribe((resp:any)=>{
      if(resp.ok){
        this._alert.showAlert("Item guardado","La subcategoria se ha guardado con éxito","success");
        this.router.navigate(['/subcategory']);
      }else {
        console.warn(resp);
        this._alert.showAlert("Error","No se ha logrado guarda con exito la subcategoria, favor de verificar los campos y haber iniciado sesion correctamente","error");
      }
    });
  }

}
