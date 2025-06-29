export const environment = {
    production: false,
    name: 'development',
    baseUrl: 'https://fitness.elevateegy.com/api/v1/',
    apiEndpoints: {
        exercises : {
            getAllExercises: () => 'exercises',
            getExercisesByMuscleAndDifficulty: (muscleId: string, difficultyId: string) => `exercises/by-muscle-difficulty?primeMoverMuscleId=${muscleId}&difficultyLevelId=${difficultyId}`,
            getRandomExercises: (muscleId: string, difficultyId: string, limit: number) => `exercises/random?targetMuscleGroupId=${muscleId}&difficultyLevelId=${difficultyId}&limit=${limit}`
        }
    }
};