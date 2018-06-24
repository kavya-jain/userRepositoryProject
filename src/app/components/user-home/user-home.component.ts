import { Component, OnInit } from "@angular/core";
import { UserDescriptionComponent } from "../user-description/user-description.component";
import { User } from "../../user";
import { UserHomeService } from "../../services/user-home.service";

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

  constructor(private userService: UserHomeService) {}

  ngOnInit() {
    this.userService.getUserData().subscribe(response => {
      this.usersList = response;
      // console.log(response);
    });
  }

  onSelectUser(user: User) {
    this.selectedUser = user;
    // alert(user.id);
  }

  addFriend(id: number) {
    let ctr: number = 0;
    if (!this.selectedUser) {
      alert("Invalid user");
    } else {
      if (this.selectedUser.id == id) {
        alert("I can't be my own friend!");
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
          alert("I am already a friend");
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
    if (ctr == 0) alert("User not found");
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
}
