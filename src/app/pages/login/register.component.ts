import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(public _alert:AlertService) { }

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

    

  }

}
