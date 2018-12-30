import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usuario: any = {};

  constructor(
    private _serviceLogin: LoginService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this._serviceLogin.login(this.usuario)
      .then(response => {

        this._serviceLogin.login(this.usuario,true)
          .then(responseToken => {
            localStorage.setItem('identity_user', JSON.stringify(response.usuario));
            localStorage.setItem('token', responseToken.token);

            this._router.navigate(['/admin/list']);
          })
          .catch(error => {
            console.log(error);
          });

      })
      .catch(error => {
        console.log(error);
      });
  }

}
