import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { USERS } from "../mock-user";
import "rxjs/add/observable/of";
import { User } from "../user";
import { ErrorMessages } from "../errorMessages";
import { ERRORS } from "../mock-messages";

@Injectable()
export class UserHomeService {
  constructor() {}

  getUserData(): Observable<User[]> {
    return Observable.of(USERS);
  }

  getErrorMessages(): Observable<ErrorMessages[]> {
    return Observable.of(ERRORS);
  }

  addFriend(userId: number, friendId: number): Observable<User[]> {
    for (let user of USERS) {
      if (user.id == userId) {
        for (let friend of user.friends) {
          if (friend == friendId) {
            break;
          }
        }
        user.friends.push(friendId);
        // alert("Added Friend");
      }
    }
    return Observable.of(USERS);
  }

  // gerSelectedUserData(selectedUser: number):Observable<User>{
  //   for(let user of USERS){
  //     if(user.id == selectedUser){
  //       return Observable.of(user);
  //     }
  //     return null;
  //   }
  // }

}
