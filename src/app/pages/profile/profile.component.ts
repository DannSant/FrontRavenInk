import { Component, OnInit } from "@angular/core";
import { User } from "../../models/user";
import { UserService } from "src/app/services/user.service";
import { AlertService } from "../../services/alert.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styles: []
})
export class ProfileComponent implements OnInit {
  user: User = {};
  constructor(
    public _userService: UserService,
    public _alert: AlertService,
    public router: Router
  ) {}

  ngOnInit() {
    this.user = this._userService.loggedUser;
    if (this.user == null || this.user == undefined) {
      this._alert.showAlert("Error", "No has iniciado sesion", "error");
      this.router.navigate(["home"]);
    }
  }

  updateData(f: NgForm) {
    if (f.invalid) {
      this._alert.showAlert(
        "Error",
        "No se han capturados todos los campos, favor de verificar los campos con asterico (*) ya que son obligatorios",
        "error"
      );
      return;
    }

    this._userService.updateUserByProfile(this.user).subscribe((resp: any) => {
      if (resp.ok) {
        this._alert.showAlert(
          "Perfil actualizado",
          "El perfil se ha guardado con éxito",
          "success"
        );
        this.router.navigate(["/profile"]);
      } else {
        console.warn(resp);
        this._alert.showAlert(
          "Error",
          "No se ha logrado guarda con exito el perfil, favor de verificar los campos y haber iniciado sesion correctamente",
          "error"
        );
      }
    });
  }
}
