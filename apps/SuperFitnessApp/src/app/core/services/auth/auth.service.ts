import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  constructor() {}
  getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  }
  
