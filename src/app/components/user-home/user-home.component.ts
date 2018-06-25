import { Component, OnInit } from "@angular/core";
import { UserDescriptionComponent } from "../user-description/user-description.component";
import { User } from "../../user";
import { UserHomeService } from "../../services/user-home.service";
import { ErrorMessages } from "../../errorMessages";

@Component({
  selector: "app-user-home",
  templateUrl: "./user-home.component.html",
  styleUrls: ["./user-home.component.css"],
  providers: [UserHomeService]
})
export class UserHomeComponent implements OnInit {
  usersList: User[] = [];
  selectedUser: User;
  searchedUser: string;
  suggestedUserList: string[] = [];
  friendList: string[] = [];
  errMsgList : ErrorMessages[] = [];
  errMsg : ErrorMessages;

  constructor(private userService: UserHomeService) {}

  ngOnInit() {
    this.userService.getUserData().subscribe(response => {
      this.usersList = response;
      // console.log(response);
    });
    this.userService.getErrorMessages().subscribe(response => {
      this.errMsgList = response;
      // console.log(response);
    });
  }

  onSelectUser(user: User) {
    this.selectedUser = user;
    this.showFriendList();
    // alert(user.id);
  }

  showFriendList(){
    for(let user of this.usersList){
      if(this.selectedUser.friends.includes(user.id))
        this.friendList.push(user.name);
    }
  }

  addFriend(id: number) {
    let ctr: number = 0;
    if (!this.selectedUser) {
      this.setError(1);
    } else {
      if (this.selectedUser.id == id) {
        this.setError(2);
      } else {
        for (let friend of this.selectedUser.friends) {
          if (id == friend) {
            ctr = 1;
            break;
          }
        }
        if (ctr == 0) {
          this.alterFriend(this.selectedUser.id, id);
        } else {
          this.setError(3);
        }
      }
    }
  }

  alterFriend(userId: number, friendId: number) {
    // alert(userId + "-->" + friendId);
    this.userService.addFriend(userId, friendId);
    this.userService.getUserData().subscribe(response => {
      this.usersList = response;
      for (let user of this.usersList) {
        if (user.id == userId) {
          let tempUser = new User();
          tempUser.id = user.id;
          tempUser.name = user.name;
          tempUser.picture = user.picture;
          tempUser.friends = user.friends;
          setTimeout(() => {
            this.selectedUser = tempUser;
          });
        }
      }
      console.log(response);
    });
  }

  onSearch(name: string) {
    let ctr: number = 0;
    for (let user of this.usersList) {
      if (user.name == name) {
        ctr = 1;
        this.onSelectUser(user);
        this.suggestedUserList = [];
      }
    }
    if (ctr == 0) 
      this.setError(4);
  }

  suggestUsers(name: string) {
    this.suggestedUserList = [];
    for (let user of this.usersList) {
      if (user.name.includes(name)) {
        this.suggestedUserList.push(user.name);
      }
    }
    if (this.suggestedUserList.length == 0) {
      this.suggestedUserList.push("No User Found");
    }
  }

  setError(code: number){
    let tempError : ErrorMessages = new ErrorMessages();
    tempError.code = code;
    for(let err of this.errMsgList){
      if(err.code == code)
        tempError.msg = err.msg;    
    }
    this.errMsg = tempError;
  }

}
