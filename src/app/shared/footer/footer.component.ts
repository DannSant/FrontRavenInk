import { Component, OnInit } from '@angular/core';
import { LanguageConfigService } from '../../services/language-config.service';
import { RatingService } from 'src/app/services/rating.service';
import { Rating } from 'src/app/models/rating';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  lastRatings:Rating[]=[];
  bestItems:any[]=[];
  constructor(
    public _languageService:LanguageConfigService,
    public _ratingService:RatingService
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
    });
  }

}
