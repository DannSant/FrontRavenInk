import { Component, OnInit } from '@angular/core';
import { LanguageConfigService } from '../../services/language-config.service';
import { RatingService } from 'src/app/services/rating.service';
import { Rating } from 'src/app/models/rating';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  lastRatings:Rating[]=[];
  bestItems:any[]=[];
  randomCategories:Category[]=[];
  constructor(
    public _languageService:LanguageConfigService,
    public _ratingService:RatingService,
    public _categoryService:CategoryService
    ) { }

  ngOnInit() {
    this._ratingService.getLastComments().subscribe(resp=>{
      if(resp.ok){
        this.lastRatings = resp.data;
      }
      this.loadBestItems();
    });
  }

  loadBestItems(){
    this._ratingService.getBestRatedItems().subscribe(resp=>{
      if(resp.ok){
        this.bestItems = resp.data;
      }
      this.loadRandomCategories();
    });
  }

  loadRandomCategories(){
    this._categoryService.getRandomCategories().subscribe(resp=>{
      if(resp.ok){
        this.randomCategories = resp.data;
        
      }
    });
  }

}
