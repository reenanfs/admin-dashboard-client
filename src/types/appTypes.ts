import { ITask } from 'pages/home/homeTypes';
import { ITaskCreationFields } from './homeTypes.ts';
import { IPerson, IPersonCreationFields } from './peopleTypes';

export type ValidAppEntities = IPerson | ITask;

export type ValidAppEntitiesCreationFields =
  | IPersonCreationFields
  | ITaskCreationFields;
