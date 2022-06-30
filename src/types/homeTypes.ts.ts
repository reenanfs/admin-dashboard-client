export interface ITaskCreationFields {
  taskName: string;
  description?: string;
  userId?: string;
  startDate?: Date;
  dueDate?: Date;
}

export interface ITaskUpdateFields {
  taskName: string;
  description?: string;
  userId?: string;
  startDate?: Date;
  dueDate?: Date;
  completionDate?: Date;
  completed?: boolean;
}
