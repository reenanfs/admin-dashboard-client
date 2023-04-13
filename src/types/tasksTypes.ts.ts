interface ITaskPersonFields {
  id: string;
  name: string;
  email: string;
}

export interface ITask {
  id: string;
  name: string;
  description?: string;
  user?: ITaskPersonFields;
  startDate?: Date | null;
  dueDate?: Date | null;
  completionDate?: Date | null;
  completed?: boolean;
}

export interface ITaskCreationFields {
  name: string;
  description?: string;
  userId?: string;
  startDate?: Date | null;
  dueDate?: Date | null;
  completed?: boolean;
}

export interface ITaskUpdateFields {
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

export interface ITasksData {
  tasks: ITask[];
}
