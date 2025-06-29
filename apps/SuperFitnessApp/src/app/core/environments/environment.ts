const baseUrl = 'https://fitness.elevateegy.com/api/v1/';

const endpoints = {
    exercises: {
        getAllExercises: (): string => 'exercises',
        getExercisesByMuscleAndDifficulty: (muscleId: string, difficultyId: string): string => `exercises/by-muscle-difficulty?primeMoverMuscleId=${muscleId}&difficultyLevelId=${difficultyId}`,
        getRandomExercises: (muscleId: string, difficultyId: string, limit: number): string => `exercises/random?targetMuscleGroupId=${muscleId}&difficultyLevelId=${difficultyId}&limit=${limit}`
    },
    muscles: {
        getAllMuscleGroups: (): string => 'muscles',
        getMusclesByMuscleGroup: (muscleGroupId: string): string => `musclesGroup/${muscleGroupId}`,
        getRandomPrimeMoverMuscles: (): string => 'muscles/random',
        getPrimeMoverMusclesByMuscleGroup: (muscleGroupId: string): string => `musclesGroup/by-muscle-group?muscleGroupId=${muscleGroupId}`
    }
};

export const environment = {
    baseUrl,
    endpoints,
    api: {
        exercises: {
            getAllExercises: (): string => `${baseUrl}${endpoints.exercises.getAllExercises()}`,
            getExercisesByMuscleAndDifficulty: (muscleId: string, difficultyId: string): string => `${baseUrl}${endpoints.exercises.getExercisesByMuscleAndDifficulty(muscleId, difficultyId)}`,
            getRandomExercises: (muscleId: string, difficultyId: string, limit: number): string => `${baseUrl}${endpoints.exercises.getRandomExercises(muscleId, difficultyId, limit)}`
        },
        muscles: {
            getAllMuscleGroups: (): string => `${baseUrl}${endpoints.muscles.getAllMuscleGroups()}`,
            getMusclesByMuscleGroup: (muscleGroupId: string): string => `${baseUrl}${endpoints.muscles.getMusclesByMuscleGroup(muscleGroupId)}`,
            getRandomPrimeMoverMuscles: (): string => `${baseUrl}${endpoints.muscles.getRandomPrimeMoverMuscles()}`,
            getPrimeMoverMusclesByMuscleGroup: (muscleGroupId: string): string => `${baseUrl}${endpoints.muscles.getPrimeMoverMusclesByMuscleGroup(muscleGroupId)}`
        }
    }
};