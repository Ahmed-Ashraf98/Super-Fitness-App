export interface LoginRes {
  message: string;
  token: string;
}

export interface LoginAPIRes {
  message: string;
  user: {
    _id: string;
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
    createdAt: string;
  };
  token: string;
}
