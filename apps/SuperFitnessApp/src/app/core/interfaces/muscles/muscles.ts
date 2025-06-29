export interface IGetAllMusclesGroupResponse {
    message:      string;
    musclesGroup: IMuscleGroup[];
}

export interface IGetMusclesByMuscleGroupResponse {
    message:     string;
    muscleGroup: IMuscleGroup;
    muscles:     IMuscle[];
}

export interface IGetRandomPrimeMoverMusclesResponse {
    message:      string;
    totalMuscles: number;
    muscles:      IMuscle[];
}

export interface IGetPrimeMoverMusclesByMuscleGroupResponse {
    message:      string;
    totalMuscles: number;
    muscles:      IMuscle[];
}

export interface IMuscleGroup {
    _id:  string;
    name: string;
}

export interface IMuscle {
    _id:   string;
    name:  string;
    image: string | null;
}
