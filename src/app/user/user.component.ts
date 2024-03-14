import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  form: FormGroup;
  user: any;

  constructor(private fb: FormBuilder, private userService: UserService){
   
  }
  ngOnInit(): void {
    this.createForm();
    
  }
  
  createForm(): void {
    this.form = this.fb.group({
      firstName: '',
      lastName: '',
      email:'',
      address:'',
    });
    this.userService.userData.subscribe(user =>{
      if(user?.id){
        this.user = user;
        this.setFormValue(user);
      }
    })
  }

  setFormValue( user: any): void{
    this.form.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
    });
  }

  onFormSubmit(): void {
    if( this.user?.id ){
      this.updateUser(this.user.id);
    }else {
      this.addUser();
    }
  }

  addUser(): void{
    if(this.form.valid){
      this.userService.addUser(this.form.value).subscribe(response =>{
        alert("User Added Successfully");
        this.userService.reloadData.next(true);
      },error =>{
        console.log("Something went Wrong");
      });
    }
  }

  updateUser(userId): void{
    if(this.form.valid){
      this.userService.updateUser(userId,this.form.value).subscribe(response =>{
        alert("User updated successfully");
        this.userService.reloadData.next(true);
      },error =>{
        console.log("Something went Wrong");
      });
    }
  }

}
