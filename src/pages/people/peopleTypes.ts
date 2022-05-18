export interface Person {
  id: string;
  name: string;
  role: string;
  email: string;
}

export interface PeopleGridRowDef {
  id: number | string;
  name: string;
  role: string;
  email: string;
}

export interface IAddPersonFields {
  name: string;
  role: string;
  email: string;
}
