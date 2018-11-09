import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  password:string;
  email:string;
  remember:boolean;

  constructor(
    public router:Router,
    public _userService:UserService,
    public _alert:AlertService
  ) { }

  ngOnInit() {
  }

  login(){
    this._userService.login(this.email,this.password,this.remember).subscribe((resp)=>{
      if(resp.ok){
        this.router.navigate(["/home"]);
        this._alert.showAlert("Bienvenido","Bienvenido de nuevo " + resp.data[0].name,"success");
      }else {
        this._alert.showAlert("Error","Password o email incorrectos","error");
      }
    });
  }

}
