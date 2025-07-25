import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from '../../../../../../../../../projects/auth-api/src/lib/auth-api.service';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private ngUnsubscribe = new Subject<void>();
  private _router = inject(Router);
  private _authApiService = inject(AuthApiService);
  private fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  errorMessage: string = '';

  login() {
    if (this.loginForm.invalid) return;
    this._authApiService
      .Login(this.loginForm.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          this._router.navigate(['home']);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error?.message || 'Invalid email or password';
        },
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
