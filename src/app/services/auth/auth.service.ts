import { Injectable } from '@angular/core';
import { User } from '../../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  setToken(token: string) {
    localStorage.setItem("auth_token", token);
  }

  getToken(): string | null {
    return localStorage.getItem("auth_token");
  }

  setUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser(): User | null {
    const userString = localStorage.getItem("user");
    if (!userString) return null;
    try {
      return JSON.parse(userString) as User;
    } catch {
      return null;
    }
  }

  clearData() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  }
}