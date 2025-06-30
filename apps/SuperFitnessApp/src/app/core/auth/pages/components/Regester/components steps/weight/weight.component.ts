import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-weight',
  imports: [CommonModule],
  templateUrl: './weight.component.html',
  styleUrl: './weight.component.scss',
})
export class WeightComponent {
  @Input() form!: FormGroup;
  @Input() weights: number[] = [];
  @Input() selectedWeightIndex!: number;
  @Input() positionClassWeight!: (i: number) => string;
  @Input() onPickWeight!: (w: number) => void;

  get currentStep(): number {
    return 3;
  }

  get stepsLength(): number {
    return 6;
  }
}
