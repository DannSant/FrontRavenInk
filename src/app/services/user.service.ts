import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user";
import { SERVICE_URL, ADMIN_ROLE_CODE } from "../config/config";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { AlertService } from "./alert.service";
import { Router } from "@angular/router";

@Injectable()
export class UserService {
  token: string = "";
  loggedUser: User;
  email: string;

  //Constantes
  USER_ROLES = ["USER_ROLE", "ADMIN_ROLE"];

  constructor(
    public http: HttpClient,
    public _alert: AlertService,
    public router: Router
  ) {
    this.cargarStorage();
    this.validateSession();
  }

  validateSession() {
    let url = SERVICE_URL + "/validateToken";
    let headers = new HttpHeaders({ token: this.token });
    return this.http.post(url, {}, { headers }).pipe(
      map((resp: any) => {
        if (resp.ok) {
          this.guardarStorage(resp.data._id, resp.token, resp.data);
        } else {
          this.token = "";
          this.loggedUser = null;
          this._alert.showAlert(
            "Sesion Expirada",
            "Vuelva a iniciar sesion",
            "error"
          );
          this.logout();
        }
        return resp;
      }),
      catchError(e => {
        if (!e.error.error) {
          console.log(e);
          return;
        }
        let errorMessage = e.error.error.message;
        console.error(errorMessage);
        this._alert.showAlert(
          "Sesion Expirada",
          "Vuelva a iniciar sesion",
          "error"
        );
        this.logout();
        return Observable.throw(e);
      })
    );
  }

  renuevaToken() {
    let url = SERVICE_URL + "/renewToken";
    let headers = new HttpHeaders({
      token: this.token
    });

    return this.http.get(url, { headers }).pipe(
      map((resp: any) => {
        let userid = this.loggedUser.id.toString();
        this.guardarStorage(userid, resp.token, this.loggedUser);
        return true;
      }),
      catchError(e => {
        let errorMessage = e.error.error.message;
        this._alert.showAlert("Error al renovar token ", errorMessage, "error");
        this.logout();
        return Observable.throw(e);
      })
    );
  }

  isAuthenticated(): boolean {
    if (this.loggedUser) {
      return true;
    } else {
      return false;
    }
  }

  isAdmin(): boolean {
    if (!this.loggedUser) {
      return false;
    } else {
      return this.loggedUser.role == ADMIN_ROLE_CODE;
    }
  }

  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.loggedUser = JSON.parse(localStorage.getItem("user"));
    } else {
      this.token = "";
      this.loggedUser = null;
    }
  }

  guardarStorage(id: string, token: string, user: User) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    this.loggedUser = user;
    this.token = token;
  }

  login(email: string, password: string, remember: boolean) {
    let url = SERVICE_URL + "/login";
    if (remember) {
      localStorage.setItem("username", email);
      this.email = email;
    }
    return this.http.post(url, { email, password }).pipe(
      map((resp: any) => {
        let user = resp.data[0];
        let token = resp.token;

        if (resp.ok) {
          this.guardarStorage(user.id, token, user);
        } else {
          this.token = "";
          this.loggedUser = null;
        }
        return resp;
      }),
      catchError(e => {
        console.log(e);
        let errorNumber: number = e.error.error.errno;

        if ([1060, 1061, 1062].includes(errorNumber)) {
          this._alert.showAlert(
            "Error",
            "Ha ocurrido un error al dar de alta al usuario, el usuario " +
              email.toUpperCase() +
              " está ya registrado en la base de datos",
            "error"
          );
        } else {
          this._alert.showAlert(
            "Error",
            "Ha ocurrido un error al dar de alta al usuario " +
              email.toUpperCase(),
            "error"
          );
        }
        return of(e);
      })
    );
    // return this.http.post(url,{username,password}).map((resp:any)=>{

    //   if(resp.ok){
    //     this.guardarStorage(resp.data.user._id,resp.token,resp.data.user);
    //   }else {
    //     this.token="";
    //     this.loggedUser=null;
    //   }
    //   return resp;
    // }).catch((e)=>{
    //   if (!e.error.error){
    //     console.log(e);
    //     return
    //   }
    //   let errorMessage = e.error.error.message;
    //   this._alert.showAlert("Error al iniciar sesion",errorMessage,"error");
    //   return Observable.throw(e);
    // });
  }

  logout() {
    this.token = "";
    this.loggedUser = null;
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate(["/home"]);
  }

  registerNormalUser(user: User) {
    let url = SERVICE_URL + "/user";
    //let headers = new HttpHeaders({token:this.token})
    //console.log(this.token)
    return this.http.post(url, user).pipe(
      catchError(e => {
        console.log(e);
        let errorNumber: number = e.error.error.errno;

        if ([1060, 1061, 1062].includes(errorNumber)) {
          this._alert.showAlert(
            "Error",
            "Ha ocurrido un error al dar de alta al usuario, el usuario " +
              user.email.toUpperCase() +
              " está ya registrado en la base de datos",
            "error"
          );
        } else {
          this._alert.showAlert(
            "Error",
            "Ha ocurrido un error al dar de alta al usuario " +
              user.username.toUpperCase(),
            "error"
          );
        }
        return of(e);
      })
    );
    // .catch((e)=>{
    //   this._alert.closeWaitWindow();
    //   if (!e.error.error){
    //     console.log(e);
    //     return
    //   }
    //   let errorMessage = e.error.error.message;
    //   console.error(errorMessage);
    //   if(e.status==409){
    //     this._alert.showAlert("Error","Ha ocurrido un error al usuario, el usuario "+user.username.toUpperCase()+" está ya registrado en la base de datos","error");
    //   }else {
    //     this._alert.showAlert("Error al crear usuario","Ha ocurrido al crear usuario, intente nuevamente despues de recargar la pagina","error");
    //   }

    //   return Observable.throw(e);
    // });
  }

  updateUserByAdmin(user: User) {
    let url = SERVICE_URL + "/user/admin/" + user.id;
    let headers = new HttpHeaders({ token: this.token });
    //console.log(this.token)
    return this.http.put(url, user, { headers }).pipe(
      catchError(e => {
        console.log(e);
        let errorNumber: number = e.error.error.errno;

        if ([1060, 1061, 1062].includes(errorNumber)) {
          this._alert.showAlert(
            "Error",
            "Ha ocurrido un error al actualizar el usuario " +
              user.email.toUpperCase() +
              " Error de referencia",
            "error"
          );
        } else {
          this._alert.showAlert(
            "Error",
            "Ha ocurrido un error al actualizar el usuario " +
              user.username.toUpperCase(),
            "error"
          );
        }
        return of(e);
      })
    );
  }

  updateUserByProfile(user: User) {
    let url = SERVICE_URL + "/user/profile/" + user.id;
    let headers = new HttpHeaders({ token: this.token });
    //console.log(this.token)
    return this.http.put(url, user, { headers }).pipe(
      catchError(e => {
        console.log(e);
        let errorNumber: number = e.error.error.errno;

        if ([1060, 1061, 1062].includes(errorNumber)) {
          this._alert.showAlert(
            "Error",
            "Ha ocurrido un error al actualizar el perfil " +
              user.email.toUpperCase() +
              " Error de referencia",
            "error"
          );
        } else {
          this._alert.showAlert(
            "Error",
            "Ha ocurrido un error al actualizar el perfil " +
              user.username.toUpperCase(),
            "error"
          );
        }
        return of(e);
      })
    );
  }

  updateUserPassword(userId: string, password: string) {
    let url = SERVICE_URL + "/user/pwd/" + userId;
    let headers = new HttpHeaders({ token: this.token });
    //console.log(this.token)
    return this.http.put(url, { password: password }, { headers }).pipe(
      catchError(e => {
        console.log(e);

        this._alert.showAlert(
          "Error",
          "Ha ocurrido un error al actualizar la contraseña",
          "error"
        );

        return of(e);
      })
    );
  }

  getUser(userId: string) {
    let headers = new HttpHeaders({
      token: this.token
    });
    let url = SERVICE_URL + "/user/" + userId;
    return this.http.get(url, { headers }).pipe(
      catchError(e => {
        console.log(e);
        //let errorNumber:number = e.error.error.errno;
        this._alert.showAlert(
          "Error",
          "Ha ocurrido un error al obtener los datos del usuario, intentar de nuevo mas tarde ",
          "error"
        );
        return of(e);
      })
    );
  }

  loadAllUsers() {
    let headers = new HttpHeaders({
      token: this.token
    });
    let url = SERVICE_URL + "/user/list/all?active=false";
    return this.http.get(url, { headers }).pipe(
      catchError(e => {
        console.log(e);
        //let errorNumber:number = e.error.error.errno;
        this._alert.showAlert(
          "Error",
          "Ha ocurrido un error al obtener los usuarios, intentar de nuevo mas tarde ",
          "error"
        );
        return of(e);
      })
    );
  }

  // searchUsers(term:string){
  //   let url = SERVICE_URL + "/user/search/" + term;
  //   let headers = new HttpHeaders({token:this.token})
  //   return this.http.get(url,{headers}).catch((e)=>{
  //     let errorMessage = e.error.error.message;
  //     //this._alert.showAlert("Error","Ha ocurrido un error al recuperar los usuarios de la base de datos. Intenta recargar la pagina","error");
  //     return Observable.throw(e);
  //   });
  // }

  // getUser(id:string){
  //   let url = SERVICE_URL + "/user?id=" + id;
  //   let headers = new HttpHeaders({token:this.token})
  //   return this.http.get(url,{headers}).catch((e)=>{
  //     let errorMessage = e.error.error.message;
  //     this._alert.showAlert("Error","Ha ocurrido un error al recuperar al usuario de la base de datos. Intenta recargar la pagina","error");
  //     return Observable.throw(e);
  //   });
  // }

  // modifyUser(user:User){
  //   let url = SERVICE_URL + "/user/" + user.id;
  //   let headers = new HttpHeaders({token:this.token})
  //   return this.http.put(url,user,{headers}).catch((e)=>{
  //     let errorMessage = e.error.error.message;
  //     this._alert.showAlert("Error","Ha ocurrido un error al guardar en la base de datos. Intenta recargar la pagina","error");
  //     return Observable.throw(e);
  //   });
  // }

  // deleteUser(user:User){
  //   let url = SERVICE_URL + "/user/delete/" + user.id;
  //   let headers = new HttpHeaders({token:this.token})
  //   return this.http.post(url,user,{headers}).catch((e)=>{
  //     let errorMessage = e.error.error.message;
  //     this._alert.showAlert("Error","Ha ocurrido un error al borrar el usuario en la base de datos. Intenta recargar la pagina","error");
  //     return Observable.throw(e);
  //   });
  // }

  // sendWelcomeMail(user:User, personalEmail:string,email:String,password?:string){
  //   let url = SERVICE_URL + "/email/welcome";
  //   let headers = new HttpHeaders({token:this.token});
  //   let body = {
  //     userEmail:email,
  //     personalEmail:personalEmail,
  //     userName:user.name,
  //     userUserName:user.username,
  //     userPassword:(password?password:user.password)
  //   }
  //   return this.http.post(url,body,{headers}).catch((e)=>{
  //     let errorMessage = e.error.error.message;
  //     this._alert.showAlert("Error","Ha ocurrido un error al enviar el email de notificacion","error");
  //     return Observable.throw(e);
  //   });
  // }
}
