import { ITasksData } from 'types/homeTypes.ts';

export const tasksData: ITasksData = {
  tasks: [
    {
      id: '83356cb4-afe1-4c45-b18e-0dc514ebdea7',
      taskName: 'Task1',
      description: 'Description1',
      user: {
        id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
        name: 'User1',
        email: 'email1@ibm.com',
      },
      startDate: null,
      dueDate: new Date('2021-07-30T20:42:06.315Z'),
      completionDate: null,
      completed: false,
    },
    {
      id: '8168ebc8-77f1-4d97-8a44-c5c8d85e8b59',
      taskName: 'Task2',
      description: '',
      user: {
        id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
        name: 'User2',
        email: 'email2@ibm.com',
      },
      startDate: null,
      dueDate: new Date('2021-07-30T20:42:06.315Z'),
      completionDate: null,
      completed: false,
    },
  ],
};
