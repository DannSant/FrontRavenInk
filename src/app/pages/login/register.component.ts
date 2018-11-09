import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AlertService } from '../../services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(
    public router:Router,
    public _alert:AlertService,
    public _userService:UserService
    ) { }

  password2:string;
  user:User={};
  errorMsg:string;

  ngOnInit() {
  }

  register(f:NgForm){
    if(f.invalid){
      this._alert.showAlert("Error","Faltan campos obligatorios","error");
      return;
    }

    if(this.user.password!=this.password2){
      this._alert.showAlert("Error","Las contraseñas no coinciden","error");
      this.errorMsg="PASSWORD"
      return;
    } else {
      this.errorMsg=""
    }

    

    this.user.type="1";
    this.user.role="1";
    this.user.username=this.user.email;
    this.user.is_wholesale="0";
    this.user.status="1";

    this._userService.registerNormalUser(this.user).subscribe(
      (resp:any)=>{
        if(resp.ok){          
          this._alert.showAlert("Gracias por registrarte","Tu registro esta completo, ya puedes empezar a comprar","success");
          this.router.navigate(["/home"]);
        }      
        
      });

    

  }

}
