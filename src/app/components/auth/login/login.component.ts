import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';

// JSON
import usersList from 'src/assets/json/users.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  dataLoading: boolean = false;
  users: Array<IUser> = usersList;
  unregistered: boolean = false;
  invalid: boolean = false;
  authenticationError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [ '', [Validators.required, Validators.minLength(3)]],
      password: [ '', [Validators.required, Validators.minLength(6)]]
    })
  }
  loginUser() {
    if (this.loginForm.invalid) { return }
    // TODO : Falta integrar el servicio para autentificar al usuario
    // JSON simulando usuarios
    const userLogin = this.loginForm.value.username;
    const passwordLogin = this.loginForm.value.password;
    const filterJson = this.users.filter(function (user) { return user.username === userLogin  });
    const isCorrectLogin  = this.authService.login(filterJson, passwordLogin, userLogin);
    if (filterJson.length > 0 && isCorrectLogin) {
      this.router.navigate(['/principal/ships'])
    } else if(!isCorrectLogin){
      this.authenticationError = true;
    } else {
      this.unregistered = true;
    }
  }
}

