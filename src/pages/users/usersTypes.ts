export interface IUsersPageData {
  project: {
    projectMemberships: IUserPageProjectMembership[];
    owner: IUserPageOwner;
  };
}

interface IUserPageProjectMembership {
  user: IUser;
  role: {
    id: string;
    name: string;
  };
}

interface IUserPageOwner {
  id: string;
  name: string;
  credential: {
    email: string;
  };
}

export interface IUser {
  id: string;
  name: string;
  credential: {
    email: string;
  };
}

export interface IUserRows {
  id: string;
  name: string;
  role: string;
  roleId: string;
  email: string;
}

export interface IUserToProjectCreationInput {
  name: string;
  roleId: string;
}

export interface IUserToProjectUpdateInput {
  id: string;
  name: string;
  roleId: string;
  projectId: string;
}

export interface IUserUpdateInput {
  name: string;
  role: string;
  email: string;
}

export interface IUsersPageRoles {
  roles: [
    {
      id: string;
      name: string;
    }
  ];
}
