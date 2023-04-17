import { ITasksPageData } from 'pages/tasks/tasksTypes';
import { IPeopleData } from 'types/peopleTypes';

export const tasksData: ITasksPageData = {
  project: {
    tasks: [
      {
        id: 'e2926154-0680-4464-b63b-aee542cf2885',
        name: 'Task1',
        description: '',
        user: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'User1',
        },
        startDate: null,
        dueDate: new Date('2021-07-31T19:05:42.030Z'),
        completionDate: null,
        completed: false,
      },
      {
        id: '03baed5f-2846-486a-bb17-2c629539f599',
        name: 'Task2',
        description: '',
        user: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'User1',
        },
        startDate: null,
        dueDate: new Date('2021-07-31T19:05:42.030Z'),
        completionDate: null,
        completed: false,
      },
      {
        id: '650ce8da-f6d8-4b83-a5a1-5310aa8f0c31',
        name: 'Task4',
        description: '',
        user: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'User1',
        },
        startDate: null,
        dueDate: new Date('2021-07-31T19:05:42.030Z'),
        completionDate: null,
        completed: false,
      },
      {
        id: '0df9a38b-c448-4117-8430-029334798da5',
        name: 'Task4',
        description: '',
        user: {
          id: 'ba06cd6b-36fe-46ac-8202-45e064587bbc',
          name: 'User2',
        },
        startDate: null,
        dueDate: new Date('2021-07-31T19:05:42.030Z'),
        completionDate: null,
        completed: false,
      },
      {
        id: '3f4d164c-5322-4228-a1e7-8665d19efc4c',
        name: 'Task5',
        description: '',
        user: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'User1',
        },
        startDate: null,
        dueDate: new Date('2021-07-31T19:05:42.030Z'),
        completionDate: null,
        completed: false,
      },
      {
        id: 'f33c64e7-dac2-432a-9c34-d75e5ba4222b',
        name: 'Task6',
        description: '',
        user: {
          id: 'ba06cd6b-36fe-46ac-8202-45e064587bbc',
          name: 'User2',
        },
        startDate: null,
        dueDate: new Date('2021-07-31T19:05:42.030Z'),
        completionDate: null,
        completed: false,
      },
      {
        id: 'ca13c86a-e1e2-406f-a726-ce9c8e7eed41',
        name: 'Task7',
        description: '',
        user: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'User1',
        },
        startDate: null,
        dueDate: new Date('2021-07-31T19:05:42.030Z'),
        completionDate: null,
        completed: false,
      },
      {
        id: '2a3315dd-cc57-4c7d-aeed-1cc6fdc705f6',
        name: 'Task8',
        description: '',
        user: {
          id: 'ba06cd6b-36fe-46ac-8202-45e064587bbc',
          name: 'User2',
        },
        startDate: null,
        dueDate: new Date('2021-07-31T19:05:42.030Z'),
        completionDate: null,
        completed: false,
      },
      {
        id: '3710e28a-3cad-4c87-8a40-e82f6db7e16b',
        name: 'Task9',
        description: '',
        user: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'User1',
        },
        startDate: null,
        dueDate: new Date('2021-07-31T19:05:42.030Z'),
        completionDate: null,
        completed: false,
      },
      {
        id: '7d7022ad-3a43-4b0a-b802-87540ed09559',
        name: 'Task10',
        description: '',
        user: {
          id: 'ba06cd6b-36fe-46ac-8202-45e064587bbc',
          name: 'User2',
        },
        startDate: null,
        dueDate: new Date('2021-07-31T19:05:42.030Z'),
        completionDate: null,
        completed: false,
      },
      {
        id: '18c6e8d7-231f-47c3-a713-45542a218ef6',
        name: 'Task11',
        description: '',
        user: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'User1',
        },
        startDate: null,
        dueDate: new Date('2021-07-31T19:05:42.030Z'),
        completionDate: null,
        completed: false,
      },
    ],
    projectMemberships: [
      {
        user: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'User1',
        },
      },
      {
        user: {
          id: 'a06cd6b-36fe-46ac-8202-45e064587bbc',
          name: 'User2',
        },
      },
    ],
  },
};

export const peopleData: IPeopleData = {
  users: [
    {
      id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
      name: 'User1',
      role: 'Role1',
      email: 'email1@email.com',
    },
    {
      id: 'ba06cd6b-36fe-46ac-8202-45e064587bbc',
      name: 'User2',
      role: 'Role2',
      email: 'email2@email.com',
    },
    {
      id: '4a64e7ad-2859-44c1-a2a4-2c25fefd2c4f',
      name: 'User3',
      role: 'Role3',
      email: 'email3@email.com',
    },
    {
      id: 'f45bc0eb-18f4-4eb3-8a02-a578d8b1dc7b',
      name: 'User4',
      role: 'Role4',
      email: 'email4@email.com',
    },
    {
      id: 'eef51037-5596-4c86-bac0-f70f8a4e1b8e',
      name: 'User5',
      role: 'Role5',
      email: 'email5@email.com',
    },
    {
      id: 'cc6db5e4-5b81-4506-9b71-b1c3f7db1864',
      name: 'User6',
      role: 'Role6',
      email: 'email6@email.com',
    },
    {
      id: '0d491324-63b2-48ea-953d-e659e790027a',
      name: 'User7',
      role: 'Role7',
      email: 'email7@email.com',
    },
    {
      id: '4696581b-412d-4aae-98fe-4b8f343611dd',
      name: 'User8',
      role: 'Role8',
      email: 'email8@email.com',
    },
    {
      id: 'c5e23f5a-9944-4800-b23a-83b6d863122e',
      name: 'User9',
      role: 'Role9',
      email: 'email9@email.com',
    },
    {
      id: '1b8bec03-feb6-433e-8c43-01e343e4e980',
      name: 'User10',
      role: 'Role10',
      email: 'email10@email.com',
    },
    {
      id: 'df8bb391-97b1-4485-a9da-2638776de98a',
      name: 'User11',
      role: 'Role11',
      email: 'email11@email.com',
    },
  ],
};
