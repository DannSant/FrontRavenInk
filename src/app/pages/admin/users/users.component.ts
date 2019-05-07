import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
  users:User[]=[];
  constructor(
    public _alert:AlertService,
    public _userService:UserService,
    public router:Router
    ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    this._userService.loadAllUsers().subscribe((resp:any)=>{
      console.log(resp);
      if(resp.ok){
        this.users=resp.data;

      }
    });
  }

}
