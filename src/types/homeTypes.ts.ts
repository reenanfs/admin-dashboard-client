interface ITaskPersonFields {
  id: string;
  name: string;
  email: string;
}

export interface ITask {
  id: string;
  taskName: string;
  description?: string;
  user?: ITaskPersonFields;
  startDate?: Date | null;
  dueDate?: Date | null;
  completionDate?: Date | null;
  completed?: boolean;
}

export interface ITaskCreationFields {
  taskName: string;
  description?: string;
  userId?: string;
  startDate?: Date | null;
  dueDate?: Date | null;
  completed?: boolean;
}

export interface ITaskUpdateFields {
  taskName: string;
  description?: string;
  userId?: string;
  startDate?: Date | null;
  dueDate?: Date | null;
  completionDate?: Date | null;
  completed?: boolean;
}

export interface ITaskRows {
  id: string;
  taskName: string;
  person?: string;
  dueDate?: Date | null;
}

export interface ITasksData {
  tasks: ITask[];
}
