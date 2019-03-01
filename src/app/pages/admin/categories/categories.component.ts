import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { AlertService } from '../../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: []
})
export class CategoriesComponent implements OnInit {
  categories:Category[]=[];
  constructor(
    public _alert:AlertService,
    public _categoryService:CategoryService,
    public router:Router,
    public activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loadItems();
  }

  loadItems(){

    this._categoryService.getAllCategories().subscribe((resp:any)=>{
      if(resp.ok){
        this.categories=resp.data;

      }
    });
  }

}
