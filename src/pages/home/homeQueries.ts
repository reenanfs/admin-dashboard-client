import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      taskName
      description
      user {
        name
        email
      }
      startDate
      dueDate
      completionDate
    }
  }
`;

export const CREATE_TASK = gql`
  mutation Mutation($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation Mutation($input: UpdateTaskInput!) {
    updateUser(input: $input) {
      taskName
    }
  }
`;

export const DELETE_TASK = gql`
  mutation Mutation($input: TaskWhereUniqueInput!) {
    deleteTask(input: $input) {
      id
    }
  }
`;

export const DELETE_TASKS = gql`
  mutation Mutation($input: DeleteTasksInput) {
    deleteTasks(input: $input) {
      count
    }
  }
`;
