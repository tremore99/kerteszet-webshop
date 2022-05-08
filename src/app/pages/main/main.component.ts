import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/app/shared/Models/User';
import { UserService } from '../../shared/services/user.service';
import { Image } from '../../shared/Models/Image';
import { query, orderBy, limit } from 'firebase/firestore';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private afs: AngularFirestore, private userService: UserService) { }

  users: Array<User> = [];
  images: Array<Image> = [];

  ngOnInit(): void {
    this.userService.getAll().subscribe(users => {
      this.users = users;
    });


    this.userService.getImages().subscribe(images => {
      this.images = images;
    });
  }

}
