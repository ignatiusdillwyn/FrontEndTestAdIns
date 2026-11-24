import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { AuthService } from '../../services/auth/auth.service';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user-model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  router = inject(Router);
  // route = inject(ActivatedRoute);
  fb = inject(FormBuilder)
  http = inject(HttpClient)
  loginSvc = inject(LoginService)
  authSvc = inject(AuthService)

  loginForm = this.fb.group({
    username: ['', [
      Validators.required,
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(6)
    ]]
  }, [{

  }]);

  onLoginHandler() {
    console.log('submit')

    const formValue = this.loginForm.value

    console.log(formValue)
    this.loginSvc.submitLogin({
      username: formValue.username ?? '',
      password: formValue.password ?? ''
    }).subscribe(
      (response: any) => {

        let user: User = {
          id: response,
          fullName: response?.user?.fullName,
          userName: response?.user?.userName,
          role: response?.user?.role
        }
        console.log('response ', response)
        this.authSvc.setToken(response?.token)
        this.authSvc.setUser(response?.user)
        if (response?.user?.role == "Employee") {
          this.router.navigate(
            ['/home']
          )
        } else {
          this.router.navigate(
            ['/approval']
          )
        }

      }
    )
  }

  ngOnInit(): void {
    console.log('login form ', this.loginForm.get('password'))
  }

}
