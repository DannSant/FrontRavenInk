import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category';
import { AlertService } from '../../../services/alert.service';
import { CategoryService } from '../../../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styles: []
})
export class CategoryDetailComponent implements OnInit {
  category: Category = {};
  constructor(
    public _alert:AlertService,
    public _categoryService:CategoryService,
    public router:Router,
    public activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loadCategory();
  }

  loadCategory(){
    this.activatedRoute.params.subscribe((params:any)=>{
      let categoryId = params.id;

      if (categoryId=='new'){
        this.cleanForm();
        return;
      }
      if(!categoryId){
        this._alert.showAlert("Error","No se ha recibido un id de item, favor de ingresar correctamente desde la opcion Iventario","error");
        this.router.navigate(["/inventory"]);
        return;
      }



      this._categoryService.getCategory(categoryId).subscribe((resp:any)=>{

        if(resp.ok){

          this.category=resp.data[0];

        }
      });
    });
  }

  cleanForm(){
    this.category={};

  }

  saveCategory(f:NgForm){
    if(f.invalid){
      this._alert.showAlert("Error","No se han capturados todos los campos, favor de verificar los campos con asterico (*) ya que son obligatorios","error");
      return;
    }

    this._categoryService.saveCategory(this.category).subscribe((resp:any)=>{
      if(resp.ok){
        this._alert.showAlert("Categoria guardada","La categoria se ha guardado con exito","success");
        this.router.navigate(['/category']);
      }else {
        console.warn(resp);
        this._alert.showAlert("Error","No se ha logrado guarda con exito la categoria, favor de verificar los campos y haber iniciado sesion correctamente","error");
      }
    });
  }

}
