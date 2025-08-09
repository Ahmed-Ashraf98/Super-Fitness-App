import { Injectable } from '@angular/core';
import { APImusclesResponse, muscles } from '../models/allMuscles';

@Injectable({
  providedIn: 'root', // كده يبقى متاح في كل المشروع
})
export class MusclesAdapter {
  adapt(response: APImusclesResponse): muscles[] {
    return response.map((item) => ({
      message: item.message,
      musclesGroup: item.musclesGroup,
    }));
  }
}
