import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/Models/User';
import { UserService } from '../../shared/services/user.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { threadId } from 'worker_threads';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userForm = new FormGroup({
    id: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
    })
  });

  constructor(private userService: UserService, private location: Location, private auth: AuthService, private router: Router) { }
  user?: User;
  id?: string = '';
  username?: string = '';
  email?: string = '';
  firstname?: string = '';
  lastname?: string = '';

  

  ngOnInit(): void {
    const user1 = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user1.uid).subscribe(data => {
      this.user = data;
      this.id = data?.id;
      this.email = data?.email;
      this.username = data?.username;
      this.firstname = data?.name.firstname;
      this.lastname = data?.name.lastname;
      console.log(data);
    }, error => {
      console.error(error);
    });
  }

  goBack() {
    this.location.back();
  }

  onChange() {
    this.userForm.get('id')?.setValue(this?.id);
    this.userForm.get('email')?.setValue(this?.email);
    
    const user: User = {
      id: this.userForm.get('id')?.value,
      username: this.userForm.get('username')?.value,
      email: this.userForm.get('email')?.value,
      name: {
        firstname: this.userForm.get('name.firstname')?.value,
        lastname: this.userForm.get('name.lastname')?.value
      }
    };

    console.log(user);
    this.userService.update(user).then(_ => {
      console.log('sikerült');
    }).catch(error => {
      console.error(error);
    });
  }
}
