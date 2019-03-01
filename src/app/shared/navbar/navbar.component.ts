import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor(  public _userService:UserService) { }

  ngOnInit() {

  }

  logout(){
    this._userService.logout();
  }

}
