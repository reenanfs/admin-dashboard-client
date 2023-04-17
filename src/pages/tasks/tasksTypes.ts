export interface ITasksPageData {
  project: {
    tasks: ITask[];
    projectMemberships: ITaskPageProjectMembership[];
  };
}

export interface ITasksPagePeople {
  project: {
    projectMemberships: ITaskPageProjectMembership[];
  };
}

export interface ITask {
  id: string;
  name: string;
  description?: string;
  user?: ITaskPagePerson;
  startDate?: Date | null;
  dueDate?: Date | null;
  completionDate?: Date | null;
  completed?: boolean;
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
  person?: string;
  dueDate?: Date | null;
}

export interface ITaskPageProjectMembership {
  user: ITaskPagePerson;
}

interface ITaskPagePerson {
  id: string;
  name: string;
}
