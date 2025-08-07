export interface muscles {
  message: string;
  musclesGroup: MusclesGroup[];
}

export interface MusclesGroup {
  _id: string;
  name: string;
}

export type APImusclesResponse = muscles[];
