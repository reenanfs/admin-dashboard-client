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

export interface ITaskRows {
  id: string;
  taskName: string;
  person?: string;
  dueDate?: Date | null;
}
