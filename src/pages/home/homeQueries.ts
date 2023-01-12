import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks($input: GetTasksInput) {
    tasks(input: $input) {
      id
      name
      description
      user {
        id
        name
        email
      }
      startDate
      dueDate
      completionDate
      completed
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($input: TaskWhereUniqueInput!) {
    deleteTask(input: $input) {
      id
    }
  }
`;

export const DELETE_TASKS = gql`
  mutation DeleteTasks($input: DeleteTasksInput) {
    deleteTasks(input: $input) {
      count
    }
  }
`;
