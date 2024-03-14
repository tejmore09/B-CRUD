import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from './user/user.component';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bcrud';

  constructor(private router: Router){}

  ngOnInit(): void {
    this.router.navigateByUrl("userList");
  }

  goToUserList(): void{
    this.router.navigateByUrl("userList");
  }

}
