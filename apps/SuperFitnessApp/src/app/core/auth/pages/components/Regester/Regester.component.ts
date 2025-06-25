import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from 'apps/SuperFitnessApp/src/lib/auth-api/src/public-api';
import {
  AbstractControl,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { validsignup } from 'apps/SuperFitnessApp/src/app/shared/utils/validsignup';
import { HttpErrorResponse } from '@angular/common/http'; // ✅ الصحيح

@Component({
  selector: 'app-regester',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // ✅ أضف هذا
    RouterLink
  ],
  templateUrl: './Regester.component.html',
  styleUrl: './Regester.component.scss',
})
export class RegesterComponent {
  private ngUnsubscribe = new Subject<void>();
  private _router = inject(Router);
  private _AuthApiService = inject(AuthApiService);

  errormessage: string = '';
  step: number = 1; // البداية من الخطوة الأولى
  selectedGender: string = '';

  register: FormGroup = new FormGroup(
    {
      fname: new FormControl(null, validsignup.name),
      lname: new FormControl(null, validsignup.name),
      email: new FormControl(null, validsignup.email),
      password: new FormControl(null, validsignup.Password),
      repassword: new FormControl(null),
      gender: new FormControl(null, validsignup.name),
    },
    { validators: this.confirmpass }
  );

  confirmpass(g: AbstractControl) {
    return g.get('password')?.value == g.get('repassword')?.value
      ? null
      : { missmatch: true };
  }

  nextStep() {
    if (
      this.step === 1 &&
      this.register.get('fname')?.valid &&
      this.register.get('lname')?.valid &&
      this.register.get('email')?.valid &&
      this.register.get('password')?.valid &&
      this.register.get('repassword')?.valid &&
      !this.register.errors?.['missmatch']
    ) {
      this.step = 2;
    }
  }

  selectGender(gender: string) {
    this.selectedGender = gender;
    this.register.get('gender')?.setValue(gender);
  }

  signup() {
    if (this.step === 1) {
      this.nextStep(); // انتقل للخطوة التالية فقط
      return;
    }

    if (this.register.invalid) return;

    this._AuthApiService
      .Regester(this.register.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res: any) => {
          if (res.message === undefined) {
            this._router.navigate(['']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.errormessage = err.error?.message || 'An error occurred';
        },
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
