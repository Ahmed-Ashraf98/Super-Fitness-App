import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-activity-level',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './activityLevel.component.html',
  styleUrl: './activityLevel.component.scss',
})
export class ActivityLevelComponent {
  @Input() form!: FormGroup;
  currentStep = 6;
  stepsLength = 6;
}
