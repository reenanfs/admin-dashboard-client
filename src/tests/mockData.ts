import { ITasksPageData } from 'pages/tasks/tasksTypes';
import { IUsersPageData } from 'pages/users/usersTypes';

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

export const usersData: IUsersPageData = {
  project: {
    projectMemberships: [
      {
        user: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'User1',
          credential: {
            email: 'email1@email.com',
          },
        },
        role: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'Project Viewer',
        },
      },
      {
        user: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'User1',
          credential: {
            email: 'email1@email.com',
          },
        },
        role: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'Project Viewer',
        },
      },
      {
        user: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'User1',
          credential: {
            email: 'email1@email.com',
          },
        },
        role: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'Project Viewer',
        },
      },
      {
        user: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'User1',
          credential: {
            email: 'email1@email.com',
          },
        },
        role: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'Project Viewer',
        },
      },
      {
        user: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'User1',
          credential: {
            email: 'email1@email.com',
          },
        },
        role: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'Project Viewer',
        },
      },
      {
        user: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'User1',
          credential: {
            email: 'email1@email.com',
          },
        },
        role: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'Project Viewer',
        },
      },
      {
        user: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'User1',
          credential: {
            email: 'email1@email.com',
          },
        },
        role: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'Project Viewer',
        },
      },
      {
        user: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'User1',
          credential: {
            email: 'email1@email.com',
          },
        },
        role: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'Project Viewer',
        },
      },
      {
        user: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'User1',
          credential: {
            email: 'email1@email.com',
          },
        },
        role: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'Project Viewer',
        },
      },
      {
        user: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'User1',
          credential: {
            email: 'email1@email.com',
          },
        },
        role: {
          id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
          name: 'Project Viewer',
        },
      },
    ],
    owner: {
      id: '9b11baa2-250c-4dbd-9b2a-7ae2545dc125',
      name: 'User1',
      credential: {
        email: 'email1@email.com',
      },
    },
  },
};
