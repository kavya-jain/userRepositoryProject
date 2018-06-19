import { Component, OnInit, Input } from '@angular/core';
import { User } from "../../user";

@Component({
  selector: 'app-user-description',
  templateUrl: './user-description.component.html',
  styleUrls: ['./user-description.component.css']
})
export class UserDescriptionComponent implements OnInit {

  @Input()
  user : User;

  constructor() { }

  ngOnInit() {
  }

}
