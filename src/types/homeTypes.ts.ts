export interface ITaskCreationFields {
  taskName: string;
  description?: string;
  userId?: string;
  startDate?: Date | null;
  dueDate?: Date | null;
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
