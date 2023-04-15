export interface IProjectManagementData {
  user: {
    projectsOwned: IPMProjectsOwned[];
    projectMemberships: IPMProjectsMembership[];
  };
}

// PM = Project Management
export interface IPMProjectsOwned {
  id: string;
  name: string;
  description: string;
}

export interface IPMProjectsMembership {
  project: {
    id: string;
    name: string;
  };
}

export interface ICreateAndUpdateProjectFields {
  name: string;
  description?: string | null;
}

export interface ICreateProjectInput {
  name: string;
  description?: string | null;
  ownerId: string;
}

export interface IUpdateProjectInput {
  id: string;
  name: string;
  description?: string | null;
}

export interface IDeleteProjectInput {
  id: string;
}

export interface currentProjectListItem {
  id: string;
  name: string;
}

export interface projectsOwnedListItem {
  id: string;
  name: string;
  description: string;
  deleting: boolean;
  editing: boolean;
}
