import { Injectable } from '@angular/core';
import { IUser } from '../users/userInterface';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {


  currentUser: IUser;

  constructor() { }

  
}
