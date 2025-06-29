import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetExercisesByMuscleAndDifficultyResponse, IGetExercisesResponse, IGetRandomExercisesResponse } from '../../interfaces/exercises/exercises';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private _httpClient: HttpClient) { }

  getAllExercises(): Observable<IGetExercisesResponse> {
    return this._httpClient.get<IGetExercisesResponse>(`${environment.baseUrl}${environment.apiEndpoints.exercises.getAllExercises()}`);
  };

  getExercisesByMuscleAndDifficulty(muscleId: string, difficultyId: string): Observable<IGetExercisesByMuscleAndDifficultyResponse> {
    return this._httpClient.get<IGetExercisesByMuscleAndDifficultyResponse>(`${environment.baseUrl}${environment.apiEndpoints.exercises.getExercisesByMuscleAndDifficulty(muscleId, difficultyId)}`);
  };

  getRandomExercises(muscleId: string, difficultyId: string, limit: number): Observable<IGetRandomExercisesResponse> {
    return this._httpClient.get<IGetRandomExercisesResponse>(`${environment.baseUrl}${environment.apiEndpoints.exercises.getRandomExercises(muscleId, difficultyId, limit)}`);
  };

}
