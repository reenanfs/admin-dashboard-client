export interface IPerson {
  id: string;
  name: string;
  role: string;
  email: string;
}

export interface IPeopleData {
  users: IPerson[];
}

export interface IPersonCreationFields {
  name: string;
  role: string;
  email: string;
}

export interface IPersonUpdateFields {
  name: string;
  role: string;
  email: string;
}
