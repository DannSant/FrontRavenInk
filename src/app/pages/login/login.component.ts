import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  redirect:string;
  itemId:string;

  constructor(  
    public _userService:UserService,
    public _alert:AlertService,
    public router:Router,
    public activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params)=>{
      this.redirect=params.redirect;
      this.itemId=params.id;
    })
  }

  login(){
    this._userService.login(this.email,this.password,this.remember).subscribe((resp)=>{
      if(resp.ok){        
        if(!this.redirect){
          this.router.navigate(["/home"]);
          this._alert.showAlert("Bienvenido","Bienvenido de nuevo " + resp.data[0].name,"success");
        }else {
          this.router.navigate(["/" + this.redirect,this.itemId]);
        }
        
      }else {
        this._alert.showAlert("Error","Password o email incorrectos","error");
      }
    });
  }

}
