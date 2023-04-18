export interface ITasksPageData {
  project: {
    tasks: ITask[];
    projectMemberships: ITaskPageProjectMembership[];
  };
}

export interface ITask {
  id: string;
  name: string;
  description?: string;
  user?: ITaskPageUser;
  startDate?: Date | null;
  dueDate?: Date | null;
  completionDate?: Date | null;
  completed?: boolean;
}

export interface ITaskPageProjectMembership {
  user: ITaskPageUser;
}

interface ITaskPageUser {
  id: string;
  name: string;
}

export interface ITasksPageUsers {
  project: {
    projectMemberships: ITaskPageProjectMembership[];
    owner: {
      id: string;
      name: string;
    };
  };
}

export interface ITaskCreationInput {
  name: string;
  description?: string;
  userId?: string;
  startDate?: Date | null;
  dueDate?: Date | null;
  completed?: boolean;
  projectId: string;
}

export interface ITaskUpdateInput {
  id: string;
  name: string;
  description?: string;
  userId?: string;
  startDate?: Date | null;
  dueDate?: Date | null;
  completionDate?: Date | null;
  completed?: boolean;
}

export interface ITaskRows {
  id: string;
  name: string;
  description?: string;
  user?: string;
  userId?: string;
  startDate?: Date | null;
  dueDate?: Date | null;
  completionDate?: Date | null;
  completed?: boolean;
}
