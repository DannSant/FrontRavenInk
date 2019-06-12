import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styles: []
})
export class BannerComponent implements OnInit {

  constructor( public _userService:UserService) { }

  ngOnInit() {
  }

}
