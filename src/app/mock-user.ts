import { User } from "./user";

export const USERS : User[] = [
  {
    id: 1,
    name: "kavya",
    picture: "./assets/images/kavya.jpg",
    friends: [2, 3, 4]
  },
  {
    id: 2,
    name: "amrita",
    picture: "./assets/images/amrita.jpg",
    friends: [1, 3]
  },
  {
    id: 3,
    name: "aastha",
    picture: "./assets/images/aastha.png",
    friends: [1]
  },
  {
    id: 4,
    name: "ria",
    picture: "./assets/images/ria.jpeg",
    friends: []
  }
];
