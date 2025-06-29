import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetAllMusclesGroupResponse, IGetMusclesByMuscleGroupResponse, IGetPrimeMoverMusclesByMuscleGroupResponse, IGetRandomPrimeMoverMusclesResponse } from '../../interfaces/muscles/muscles';

@Injectable({
  providedIn: 'root'
})
export class MusclesService {

  constructor(private readonly _httpClient : HttpClient) { }

  getAllMuscleGroups(): Observable<IGetAllMusclesGroupResponse> {
    return this._httpClient.get<IGetAllMusclesGroupResponse>(environment.api.muscles.getAllMuscleGroups());
  };

  getMusclesByMuscleGroup(muscleGroupId: string): Observable<IGetMusclesByMuscleGroupResponse> {
    return this._httpClient.get<IGetMusclesByMuscleGroupResponse>(environment.api.muscles.getMusclesByMuscleGroup(muscleGroupId));
  };

  getRandomPrimeMoverMuscles(): Observable<IGetRandomPrimeMoverMusclesResponse> {
    return this._httpClient.get<IGetRandomPrimeMoverMusclesResponse>(environment.api.muscles.getRandomPrimeMoverMuscles());
  };

  getPrimeMoverMusclesByMuscleGroup(muscleGroupId: string): Observable<IGetPrimeMoverMusclesByMuscleGroupResponse> {
    return this._httpClient.get<IGetPrimeMoverMusclesByMuscleGroupResponse>(environment.api.muscles.getPrimeMoverMusclesByMuscleGroup(muscleGroupId));
  };
}
