import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(public _userService: UserService, public _router: Router) {}
  isCollapsed: boolean = true;
  searchTerm: string = "";
  ngOnInit() {}

  logout() {
    this._userService.logout();
  }

  search(event: any) {
    if (event.key === "Enter") {
      this._router.navigate(["search", this.searchTerm]);
    }
  }
}
