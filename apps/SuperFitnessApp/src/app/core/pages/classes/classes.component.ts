import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../services/workout/workout.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IExercise, IGetExercisesResponse } from '../../interfaces/exercises/exercises';

@Component({
  selector: 'app-classes',
  imports: [CommonModule],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css',
})
export class ClassesComponent implements OnInit {

  private readonly _workoutService = inject(WorkoutService);
  private readonly _destroyRef = inject(DestroyRef);

  exercises = signal<IExercise[]>([]);

  ngOnInit(): void {
    this.getClasses();
  }

  getClasses(): void {
    this._workoutService.getAllExercises().pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (res: IGetExercisesResponse) => {
        this.exercises.set(res.exercises);
      },
      error: (err) => {
        console.error('Error fetching classes:', err);
      }
    })
  }
}
