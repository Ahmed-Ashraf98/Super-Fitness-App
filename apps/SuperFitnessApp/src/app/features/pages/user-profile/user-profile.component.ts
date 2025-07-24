import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeManagerService } from 'apps/SuperFitnessApp/src/app/core/services/ThemeManger/ThemeManagerService.service';
import { TranslateManagerService } from 'apps/SuperFitnessApp/src/app/core/services/TranslateManger/translate-manager-service.service';
import { AuthApiService } from 'projects/auth-api/src/lib/auth-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, ReactiveFormsModule, CommonModule],
})
export class UserProfileComponent implements OnInit {

  constructor() { }
  themeVal: boolean = false;
  langVal: boolean = false;
  fetchIsDone = false;

  private readonly _themeManager = inject(ThemeManagerService); 
  private readonly _translateManager = inject(TranslateManagerService);
  private readonly _authApiService = inject(AuthApiService);
  private readonly _router= inject(Router)
  private readonly fb = inject(FormBuilder);

  // Password reset dialog state
  showResetDialog = false;
  resetForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    newPassword: ['', [Validators.required, Validators.minLength(8)]]
  });
  resetLoading = false;
  resetError = '';
  resetSuccess = '';
  resetAttempted = false;
  showPassword = false;
  showNewPassword = false;
  showPasswordChangeSuccess = false;

  openResetDialog() {
    this.resetForm.reset();
    this.resetError = '';
    this.resetSuccess = '';
    this.resetAttempted = false;
    this.showResetDialog = true;
  }

  closeResetDialog() {
    this.showResetDialog = false;
  }

  submitReset() {
    this.resetAttempted = true;
    if (this.resetForm.invalid) return;
    this.resetLoading = true;
    this.resetError = '';
    this.resetSuccess = '';
    const { password, newPassword } = this.resetForm.value;
    this._authApiService.changePassword({ password, newPassword }).subscribe({
      next: () => {
        this.resetSuccess = 'Password changed successfully!';
        this.resetLoading = false;
        this.resetAttempted = false;
        this.showPasswordChangeSuccess = true;
        setTimeout(() => {
          localStorage.removeItem('token');
          this.closeResetDialog();
          this._router.navigate(['/auth/login']);
          this.showPasswordChangeSuccess = false;
        }, 1500);
      },
      error: (err) => {
        this.resetError = err?.error?.message || 'Failed to reset password.';
        this.resetLoading = false;
      }
    });
  }

  toggleTheme() {
    this.themeVal = !this.themeVal;
    console.log(this.themeVal);
    this._themeManager.toggleTheme();
  }
  toggleLang() {
    this.langVal = !this.langVal;
    console.log(`Language Now is :  ${this.langVal}`);
    this._translateManager.toggleLanguage();
  }

  getUserPrefFromCookies() {
    const theme = this._themeManager.getCurrentTheme();
    const lang = this._translateManager.getCurrentLang();

    if (theme == 'dark') {
      this.themeVal = true;
    }

    if (lang == 'ar') {
      this.langVal = true;
    }
  }

  showLogoutDialog = false;

  openLogoutDialog() {
    this.showLogoutDialog = true;
  }
  closeLogoutDialog() {
    this.showLogoutDialog = false;
  }
  confirmLogout() {
    this.closeLogoutDialog();
    this._authApiService.Logout().subscribe({
      next: (res) => {
        console.log('Logout successful:', res);
        localStorage.removeItem('token');
        this._router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Logout failed:', err);
        // ممكن تعرض رسالة خطأ لو حبيت
      }
    });
  }
  
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  toggleShowNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  ngOnInit(): void {
    this._themeManager.initTheme();
    this.getUserPrefFromCookies();
  }



}
