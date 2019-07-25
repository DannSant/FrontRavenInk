import { Injectable } from '@angular/core';
import { BehaviorSubject  } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LanguageConfigService {
  SPANISH = "spanish";
  ENGLISH = "english";

  public languageObservable: BehaviorSubject<string> = new BehaviorSubject(this.SPANISH);

  constructor() { 
    this.currentLanguage=this.SPANISH;
  }

  currentLanguage:string;

  

  changeLanguage(languageNumber){
    if(languageNumber==0){
      this.currentLanguage=this.SPANISH;
    }else if(languageNumber==1){
      this.currentLanguage=this.ENGLISH;
    }
    this.languageObservable.next(this.currentLanguage);
  }

  // getLanguage():Observable<string>{
  //   return this.languageObservable();
  // //   return Observable.create(observer => {
  // //     observer.next(this.currentLanguage);
  // //     observer.complete();
  // // });
  // }
}
