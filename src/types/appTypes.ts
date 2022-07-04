import {
  ITaskCreationFields,
  ITasksData,
  ITask,
  ITaskRows,
} from './homeTypes.ts';
import { IPeopleData, IPerson, IPersonCreationFields } from './peopleTypes';

export type ValidAppEntities = IPerson | ITask;

export type ValidAppEntitiesCreationFields =
  | IPersonCreationFields
  | ITaskCreationFields;

export type ValidAppEntitiesData = IPeopleData | ITasksData;

export type ValidGridRows = ITaskRows | IPerson;
