import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APImusclesResponse, muscles, MuscleGroupDetailResponse, ExercisesResponse, Exercise } from '../../models/allMuscles';
import { map, Observable } from 'rxjs';
import { ApiEndpoint } from '../../enums/api.endpoints';
import { MusclesAdapter } from '../../adapters/muscles,adapters';

@Injectable({
  providedIn: 'root',
})
export class MusclesService {
  constructor(
    private _httpClient: HttpClient,
    private _musclesAdapter: MusclesAdapter
  ) {}

  getAllmuscles(): Observable<muscles> {
    return this._httpClient
      .get<APImusclesResponse>(ApiEndpoint.AllMuscles)
      .pipe(map((res) => this._musclesAdapter.adapt(res)));
  }

  getMuscleGroupDetail(groupId: string): Observable<MuscleGroupDetailResponse> {
    return this._httpClient.get<MuscleGroupDetailResponse>(
      `${ApiEndpoint.MuscleGroupDetail}/${groupId}`
    );
  }

  getRandomExercises(
    targetMuscleGroupId: string,
    difficultyLevelId: string,
    limit: number = 10
  ): Observable<ExercisesResponse> {
    const params = {
      targetMuscleGroupId,
      difficultyLevelId,
      limit: limit.toString()
    };
    return this._httpClient.get<ExercisesResponse>(ApiEndpoint.RandomExercises, { params });
  }
}
