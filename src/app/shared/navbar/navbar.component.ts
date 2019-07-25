import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { ModalDirective } from 'angular-bootstrap-md';
import { LanguageConfigService } from '../../services/language-config.service';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(public _userService: UserService,
    public _languageService:LanguageConfigService, 
    public _alert:AlertService,
    public _router: Router
    ) {}
  isCollapsed: boolean = true;
  searchTerm: string = "";

  @ViewChild('basicModal') basicModal: ModalDirective;

  ngOnInit() {}

  logout() {
    this._userService.logout();
  }

  search(event: any) {
    if (event.key === "Enter") {
      this.basicModal.hide()
      this._router.navigate(["search", this.searchTerm]);
      this.searchTerm="";
    }
  }

  changeLanguage(value:number){
    this._languageService.changeLanguage(value);
    if(value==0){
      this.showTrasnlateWindow("Espere","Espere por favor, nuestros traductores están trabajando lo más rapido que pueden... <br> <i class='fas fa-spinner fa-spin'></i></h3>");
      
    }else if(value==1){
      this.showTrasnlateWindow("One moment","Please wait, our translators are working extra hours... <br> <i class='fas fa-spinner fa-spin'></i></h3>");
    }
    
  }

  showTrasnlateWindow(title:string,content:string){
    this._alert.showWaitWindow(title,content);
    setTimeout(()=>{
      this._alert.closeWaitWindow();
    },3000);
  }
}
