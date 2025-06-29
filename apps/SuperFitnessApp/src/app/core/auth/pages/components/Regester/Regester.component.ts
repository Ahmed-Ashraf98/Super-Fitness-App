import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { AuthApiService } from 'apps/SuperFitnessApp/src/lib/auth-api/src/public-api';
import { HttpErrorResponse } from '@angular/common/http';
import { registerUser } from 'apps/SuperFitnessApp/src/lib/auth-api/src/lib/interface/register';

@Component({
  selector: 'app-regester',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './regester.component.html',
  styleUrls: ['./regester.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  loading = false;
  errorMessage = '';

  // Pickers data
  ages: number[]    = Array.from({ length: 83 }, (_, i) => i + 18);   // 18–100
  weights: number[] = Array.from({ length: 120 }, (_, i) => i + 30);  // 30–149
  heights: number[] = Array.from({ length: 120 }, (_, i) => i + 100); // 100–219

  steps = ['Account','Gender','Age','Weight','Height','Goal & Activity'];
  currentStep = 0;

  private destroy$ = new Subject<void>();
  private router    = inject(Router);
  private authService = inject(AuthApiService);
  private fb          = inject(FormBuilder);

  ngOnInit() {
    this.form = this.fb.group({
        fname:      ['', [Validators.required, Validators.minLength(2)]],
        lname:      ['', [Validators.required, Validators.minLength(2)]],
        email:      ['', [Validators.required, Validators.email]],
        password:   ['', [Validators.required, Validators.minLength(6)]],
        repassword: ['', [Validators.required]],
        gender:     [null, Validators.required],
        age:        [null, [Validators.required]],
        weight:     [null, [Validators.required]],
        height:     [null, [Validators.required]],
        goal:         [null, Validators.required],
        activityLevel:[null, Validators.required],
      },
      { validators: RegisterComponent.passwordMatch }
    );
  }

  // age picker
  get selectedAgeIndex() {
    return this.ages.findIndex(a => a === this.form.value.age);
  }
  onPickAge(age: number) {
    this.form.get('age')!.setValue(age);
  }
  positionClassAge(idx: number) {
    const d = idx - this.selectedAgeIndex;
    if (d === 0) return 'center';
    if (d === -1) return 'left';
    if (d === 1) return 'right';
    return 'hidden';
  }

  // weight picker
  get selectedWeightIndex() {
    return this.weights.findIndex(w => w === this.form.value.weight);
  }
  onPickWeight(w: number) {
    this.form.get('weight')!.setValue(w);
  }
  positionClassWeight(idx: number) {
    const d = idx - this.selectedWeightIndex;
    if (d === 0) return 'center';
    if (d === -1) return 'left';
    if (d === 1) return 'right';
    return 'hidden';
  }

  // height picker
  get selectedHeightIndex() {
    return this.heights.findIndex(h => h === this.form.value.height);
  }
  onPickHeight(h: number) {
    this.form.get('height')!.setValue(h);
  }
  positionClassHeight(idx: number) {
    const d = idx - this.selectedHeightIndex;
    if (d === 0) return 'center';
    if (d === -1) return 'left';
    if (d === 1) return 'right';
    return 'hidden';
  }

  // static validator
  static passwordMatch: ValidatorFn = (g: AbstractControl) => {
    const pass   = g.get('password')!.value;
    const repass= g.get('repassword')!.value;
    return pass === repass ? null : { mismatch: true };
  };

  isFirstStep() { return this.currentStep === 0; }
  isLastStep()  { return this.currentStep === this.steps.length - 1; }

  next() {
    if (this.formStepValid() && !this.isLastStep()) {
      this.currentStep++;
    }
  }
  prev() {
    if (!this.isFirstStep()) {
      this.currentStep--;
    }
  }

  // each step controls
  stepControls(): string[][] {
    return [
      ['fname','lname','email','password','repassword'],
      ['gender'],
      ['age'],
      ['weight'],
      ['height'],
      ['goal','activityLevel']
    ];
  }
  formStepValid(): boolean {
    const keys = this.stepControls()[this.currentStep];
    const allValid = keys.every(k => this.form.get(k)!.valid);
    return allValid && !this.form.hasError('mismatch');
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    const payload: registerUser = {
      firstName:     this.form.value.fname,
      lastName:      this.form.value.lname,
      email:         this.form.value.email,
      password:      this.form.value.password,
      rePassword:    this.form.value.repassword,
      gender:        this.form.value.gender,
      age:           this.form.value.age,
      weight:        this.form.value.weight,
      height:        this.form.value.height,
      goal:          this.form.value.goal,
      activityLevel: this.form.value.activityLevel
    };

    this.authService.Regester(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error?.message || 'An unexpected error';
          this.loading = false;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
