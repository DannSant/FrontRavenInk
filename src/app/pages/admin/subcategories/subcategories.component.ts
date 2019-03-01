import { Component, OnInit } from '@angular/core';
import { Subcategory } from '../../../models/subcategory';
import { SubcategoryService } from '../../../services/subcategory.service';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styles: []
})
export class SubcategoriesComponent implements OnInit {
  subcategories:Subcategory[] = [];
  constructor(
    public _alert:AlertService,
    public _subcategoryService:SubcategoryService,
    public router:Router
  ) { }

  ngOnInit() {
    this.loadSubcategories();
  }

  loadSubcategories(){

    this._subcategoryService.getAllSubcategories().subscribe((resp:any)=>{
      if(resp.ok){
        this.subcategories=resp.data;

      }
    });
  }

}
