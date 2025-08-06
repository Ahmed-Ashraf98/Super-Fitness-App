import { Component } from '@angular/core';
import { MusclesGroup } from '../../../core/models/allMuscles';
import { MusclesService } from '../../../core/services/muscles/muscles.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fitness-class',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './fitness-class.component.html',
  styleUrls: ['./fitness-class.component.css']
})
export class FitnessClassComponent {
  muscleGroups: MusclesGroup[] = [];
  selectedGroupId = 'full_body';  // الافتراضي Full Body

  constructor(private _MusclesService: MusclesService) {}

  ngOnInit() {
    this._MusclesService.getAllmuscles().subscribe((response) => {
      // Assuming response is of type muscles[]
      // We need to flatten the musclesGroup arrays into a single array
      this.muscleGroups = response.flatMap(item => item.musclesGroup);
    });
  }

  selectGroup(id: string) {
    this.selectedGroupId = id;
  }

  shouldShow(group: MusclesGroup): boolean {
    return this.selectedGroupId === 'full_body' || this.selectedGroupId === group._id;
  }
}
