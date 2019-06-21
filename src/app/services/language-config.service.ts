import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageConfigService {

  constructor() { 
    this.currentLanguage=this.SPANISH;
  }

  currentLanguage:string;

  SPANISH = "spanish";
  ENGLISH = "english";

  changeLanguage(languageNumber){
    if(languageNumber==0){
      this.currentLanguage=this.SPANISH;
    }else if(languageNumber==1){
      this.currentLanguage=this.ENGLISH;
    }
  }
}
