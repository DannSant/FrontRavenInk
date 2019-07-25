import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { User } from "src/app/models/user";
import { AlertService } from "../../services/alert.service";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import { LanguageConfigService } from '../../services/language-config.service';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: []
})
export class RegisterComponent implements OnInit {
  constructor(
    public router: Router,
    public _alert: AlertService,
    public _userService: UserService,
    public _languageService:LanguageConfigService
  ) {}

  password2: string;
  user: User = {};
  errorMsg: string;

  ngOnInit() {}

  register(f: NgForm) {
    if (f.invalid) {
      this._alert.showAlert("Error", "Faltan campos obligatorios", "error");
      return;
    }

    if (this.user.password != this.password2) {
      this._alert.showAlert("Error", "Las contraseñas no coinciden", "error");
      this.errorMsg = "PASSWORD";
      return;
    } else {
      this.errorMsg = "";
    }

    this.user.type = "1";
    this.user.role = "2";
    this.user.username = this.user.email;
    this.user.is_wholesale = "0";
    this.user.status = "1";

    this._userService.registerNormalUser(this.user).subscribe((resp: any) => {
      if (resp.ok) {
        this._alert.showAlert(
          "Gracias por registrarte",
          "Tu registro esta completo, ya puedes empezar a comprar",
          "success"
        );
        this.login()
        this.router.navigate(["/home"]);
      }
    });
  }

  login(){
    this._userService.login(this.user.email,this.user.password,false).subscribe((resp)=>{
      
    });
  }
}
