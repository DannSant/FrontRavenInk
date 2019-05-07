import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserRole } from '../../../models/userRole';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UserRoleService } from 'src/app/services/user-role.service';
import { AlertService } from '../../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styles: []
})
export class UsersDetailComponent implements OnInit {
  user:User = {};
  roles:UserRole[]=[];
  constructor(
    public _alert:AlertService,
    public _userService:UserService,
    public _userRoleService:UserRoleService,
    public router:Router,
    public activatedRoute:ActivatedRoute,

  ) { }

  ngOnInit() {
    this.loadCatalogs();
  }

  loadCatalogs(){
    this._userRoleService.getAllRoles().subscribe((resp:any)=>{
      if(resp.ok){
        this.roles=resp.data;
        this.loadUser();
      }
    });
  }

  loadUser(){
    this.activatedRoute.params.subscribe((params:any)=>{
      let userId = params.id;

      if (userId=='new'){
        this.cleanForm();
        return;
      }
      if(!userId){
        this._alert.showAlert("Error","No se ha recibido un id de item, favor de ingresar correctamente desde la opcion Iventario","error");
        this.router.navigate(["/inventory"]);
        return;
      }



      this._userService.getUser(userId).subscribe((resp:any)=>{

        if(resp.ok){

          this.user=resp.data[0];

        }
      });
    });
  }

  cleanForm(){
    this.user={};
  }

  save(f:NgForm){
    if(f.invalid){
      this._alert.showAlert("Error","No se han capturados todos los campos, favor de verificar los campos con asterico (*) ya que son obligatorios","error");
      return;
    }

    this._userService.updateUserByAdmin(this.user).subscribe((resp:any)=>{
      if(resp.ok){
        this._alert.showAlert("Usuario guardado","El usuario se ha guardado con éxito","success");
        this.router.navigate(['/user']);
      }else {
        console.warn(resp);
        this._alert.showAlert("Error","No se ha logrado guarda con exito el usuario, favor de verificar los campos y haber iniciado sesion correctamente","error");
      }
    });
  }

}
