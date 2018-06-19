import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { USERS } from "../../mock-user";
import { User } from "../../user";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  @Input() users;
  @Input() suggestedUserList : string[] = [];
  @Output() onUserSelected: EventEmitter<User> = new EventEmitter<User>();
  @Output() friendlyUser: EventEmitter<number> = new EventEmitter<number>();
  @Output() searchedUser: EventEmitter<string> = new EventEmitter<string>();
  @Output() suggestedUser: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  public showUserDesc(user: User): void {
    console.log(user);
    this.onUserSelected.emit(user);
  }

  public addFriend(id: number): void {
    // alert(id);
    this.friendlyUser.emit(id);
  }

  public showSearchedUser(name: string): void {
    alert(name);
    this.searchedUser.emit(name);
  }

  public suggestUser(name: string): void {
    // alert(name);
    this.suggestedUser.emit(name);
  }

  ngOnInit() {}
}
