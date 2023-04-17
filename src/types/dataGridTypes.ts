import { IPeopleData, IPerson, IPersonCreationInput } from './peopleTypes.js';
import {
  ITask,
  ITaskCreationInput,
  ITaskRows,
  ITasksPageData,
} from 'pages/tasks/tasksTypes.js';

export type ValidDataGridEntities = IPerson | ITask;

export type ValidDataGridEntitiesCreationInput =
  | IPersonCreationInput
  | ITaskCreationInput;

export type ValidDataGridRows = ITaskRows | IPerson;

export type ValidDataGridRefetchData = IPeopleData | ITasksPageData;
