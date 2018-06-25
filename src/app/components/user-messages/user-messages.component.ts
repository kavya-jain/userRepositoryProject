import { Component, OnInit, Input } from '@angular/core';
import { ErrorMessages } from '../../errorMessages';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css']
})
export class UserMessagesComponent implements OnInit {

  @Input()
  userError : ErrorMessages;

  public HideDiv(){
    // document.getElementById("parentDiv").hidden=true;
    this.userError=null;
  }

  constructor() { }

  ngOnInit() {
  }


}
