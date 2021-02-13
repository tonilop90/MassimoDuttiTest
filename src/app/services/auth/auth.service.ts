import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(filterUser: any, password: string, userLogin: string): boolean {
    if(filterUser[0].password == password && filterUser[0].username == userLogin){
      console.log(filterUser, password, userLogin);
      localStorage.setItem('loginKey', `${userLogin}_${Date.now().toString()}`)
      return true;
    }
    return false;
  }
}
