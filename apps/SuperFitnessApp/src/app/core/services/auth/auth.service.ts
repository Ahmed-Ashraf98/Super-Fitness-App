import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
