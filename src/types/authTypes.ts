export interface ICredential {
  id: string;
  email: string;
  user: {
    id: string;
    name: string;
    photoUrl: string;
    isAdmin: boolean;
  };
}

export interface IAuthResponse {
  access_token: string;
  refresh_token: string;
  credential: ICredential;
}

export interface ICurrentUser {
  id: string;
  credentialId: string;
  name: string;
  photoUrl: string;
  email: string;
  isAdmin: boolean;
}

export interface ILocalLocalSignoutInput {
  id: string;
}
