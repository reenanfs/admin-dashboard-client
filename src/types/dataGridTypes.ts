import {
  ITaskCreationInput,
  ITaskRows,
  ITaskUpdateInput,
  ITasksPageData,
} from 'pages/tasks/tasksTypes.js';

import {
  IUserToProjectCreationInput,
  IUsersPageData,
  IUserToProjectUpdateInput,
  IUserRows,
} from 'pages/users/usersTypes.js';

export type ValidDataGridEntitiesUpdateInput =
  | IUserToProjectUpdateInput
  | ITaskUpdateInput;

export type ValidDataGridEntitiesCreationInput =
  | IUserToProjectCreationInput
  | ITaskCreationInput;

export type ValidDataGridRows = ITaskRows | IUserRows;

export type ValidDataGridRefetchData = IUsersPageData | ITasksPageData;
