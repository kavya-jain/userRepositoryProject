import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserHomeComponent } from "./components/user-home/user-home.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserDescriptionComponent } from "./components/user-description/user-description.component";
import { UserMessagesComponent } from './components/user-messages/user-messages.component';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

const appRoutes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: UserHomeComponent }
];

@NgModule({
  declarations: [
    UserHomeComponent,
    UserDescriptionComponent,
    UserListComponent,
    UserMessagesComponent
  ],
  imports: [RouterModule.forRoot(appRoutes),
  CommonModule,
  FormsModule],
  exports: [RouterModule]
})
export class AppRoutes {}
