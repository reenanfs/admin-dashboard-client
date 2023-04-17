export interface IPerson {
  id: string;
  name: string;
  role: string;
  email: string;
}

export interface IPeopleData {
  users: IPerson[];
}

export interface IPersonCreationInput {
  name: string;
  role: string;
  email: string;
}

export interface IPersonUpdateInput {
  name: string;
  role: string;
  email: string;
}
