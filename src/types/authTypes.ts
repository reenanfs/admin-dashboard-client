export interface ICredential {
  id: string;
  email: string;
  user: {
    id: string;
    name: string;
    photoUrl: string;
    isAdmin: boolean;
    currentProject: {
      id: string;
    };
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
  currentProjectId: string | null;
  name: string;
  photoUrl: string;
  email: string;
  isAdmin: boolean;
}

export interface ILocalLocalSignoutInput {
  id: string;
}
