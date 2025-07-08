export interface RegisterRes {
  message: string;
}

export interface RegisterAPIRes {
  message: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    age: number;
    weight: number;
    height: number;
    activityLevel: string;
    goal: string;
    photo: string;
    _id: string;
    createdAt: string;
  };
  token: string;
}
