export interface LoginRes {
  message: string;
  token: string;
  email: string;
}

export interface ProfileDataRes {
  message: string;
  user: User;
  token: string;
}

export interface User {
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
  passwordChangedAt: string;
}
