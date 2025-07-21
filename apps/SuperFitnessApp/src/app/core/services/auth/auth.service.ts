import { Injectable, signal, WritableSignal } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { localStorageKeys } from '../../models/localStorageKeys';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  constructor() {}
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
}





