export interface ILoginFields {
  email: string;
  password: string;
}

export interface ISignupFields {
  name: string;
  email: string;
  password: string;
}

export interface IAuthResponse {
  access_token: string;
  refresh_token: string;
}
