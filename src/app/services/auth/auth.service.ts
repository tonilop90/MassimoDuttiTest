import { Injectable } from '@angular/core';
import usersList from 'src/assets/json/users.json';
import { IUser } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(filterUser: any, password: string, userLogin: string): boolean {
    if(filterUser[0].password == password && filterUser[0].username == userLogin){
      console.log(filterUser, password, userLogin);
      localStorage.setItem('loginKey', `${userLogin}_${Date.now().toString()}`);
      return true;
    }
    return false;
  }

  signup(user: any){
    try{
      const data : IUser = {
        first_name:user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        password: 'prueba1234'
      };
      usersList.push(data)
      console.log('User Register -->', usersList);
      localStorage.setItem('loginKey', `${data.username}_${Date.now().toString()}`)
      return true;
    }catch(error) {
      console.log(error);
      return false;
    }
      
  }
}
