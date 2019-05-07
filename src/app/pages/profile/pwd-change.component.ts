import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertService } from "../../services/alert.service";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-pwd-change",
  templateUrl: "./pwd-change.component.html",
  styles: []
})
export class PwdChangeComponent implements OnInit {
  constructor(
    public router: Router,
    public _alert: AlertService,
    public _userService: UserService
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

    this._userService
      .updateUserPassword(
        this._userService.loggedUser.id.toString(),
        this.user.password
      )
      .subscribe((resp: any) => {
        if (resp.ok) {
          this._alert.showAlert(
            "Password actualizado",
            "Se ha actualizado la contraseña de manera exitosa",
            "success"
          );
          this.router.navigate(["/profile"]);
        }
      });
  }
}
