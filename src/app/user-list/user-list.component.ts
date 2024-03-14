import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserData } from '../models/user-model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'address', 'actions'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  userList: any[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
  ){}


  ngOnInit(): void {
    this.userService.userData.subscribe(res =>{
      if(res){
        this.getUserList();
      }
    })
  }

  getUserList(): void {
    this.userService.getUserList().subscribe(res =>{
      console.log('userList', res);
      this.userList = res;
      this.userService.reloadData.next(false);
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
    });
  }

  editUser(user: any): void {
    console.log(user);
    this.userService.userData.next(user);
    this.router.navigateByUrl("create");
  }

  deleteUser(user: any): void{
    console.log(user);
    this.userService.deleteUser(user.id).subscribe(res =>{
      alert("User deteled successfully");
      this.getUserList();
    });
  }

  addUser(): void{
    this.router.navigateByUrl("create");
  }

}
