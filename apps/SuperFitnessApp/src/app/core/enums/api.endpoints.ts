import { environment } from './../../../../../../Environments/environment.prod';
export class ApiEndpoint {
  static AllMuscles = `${environment.baseUrl}/api/v1/muscles`;
}
