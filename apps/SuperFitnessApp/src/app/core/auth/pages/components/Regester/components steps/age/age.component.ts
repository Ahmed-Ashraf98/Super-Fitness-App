import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-age',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './age.component.html',
  styleUrls: ['./age.component.scss'],
})
export class AgeComponent {
  @Input() form!: FormGroup;
  @Input() ages: number[] = [];
  @Input() selectedAgeIndex!: number;
  @Input() positionClassAge!: (i: number) => string;
  @Input() onPickAge!: (age: number) => void;

  get currentStep(): number {
    return 2; // ثابت أو يُمرّر إن أردت
  }

  get stepsLength(): number {
    return 6; // ثابت أو يُمرّر إن أردت
  }
}
