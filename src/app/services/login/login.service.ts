import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http = inject(HttpClient)

  submitLogin(data: { username: string, password: string }) {
    return this.http.post(
      `${environment.apiUrl}/auth/login`,
      {
        username: data.username,
        password: data.password
      }
    )
  }
}
