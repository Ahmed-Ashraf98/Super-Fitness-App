import { Component } from '@angular/core';
import { MusclesGroup } from '../../../core/models/allMuscles';
import { MusclesService } from '../../../core/services/muscles/muscles.service';
import { CommonModule } from '@angular/common';
import { CustomCardComponent } from "../../../shared/components/cutom-card/custom-card.component";

@Component({
  selector: 'app-fitness-class',
  imports: [CommonModule, CustomCardComponent],
  standalone: true,
  templateUrl: './fitness-class.component.html',
  styleUrls: ['./fitness-class.component.Scss']
})
export class FitnessClassComponent {
  muscleGroups: MusclesGroup[] = [];
  selectedGroupId = 'full_body';  // الافتراضي Full Body

  constructor(private _MusclesService: MusclesService) {}

  ngOnInit() {
    this._MusclesService.getAllmuscles().subscribe((response) => {
      this.muscleGroups = response.flatMap(item => item.musclesGroup);
    });
  }

  selectGroup(id: string) {
    this.selectedGroupId = id;
  }

  shouldShow(group: MusclesGroup): boolean {
    return this.selectedGroupId === 'full_body' || this.selectedGroupId === group._id;
  }
  onReadMore(id?: string) {
    // Implement navigation or modal logic here
    console.log('Read more for:', id);
  }
}
