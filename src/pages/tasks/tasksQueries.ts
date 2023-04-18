import { gql } from '@apollo/client';

export const GET_TASKS_PAGE_DATA = gql`
  query GetTasksPageData($input: ProjectWhereUniqueInput!) {
    project(input: $input) {
      tasks {
        id
        name
        description
        user {
          id
          name
        }
        startDate
        dueDate
        completionDate
        completed
      }
    }
  }
`;

export const GET_TASKS_PAGE_USERS = gql`
  query GetTasksPageUsers($input: ProjectWhereUniqueInput!) {
    project(input: $input) {
      projectMemberships {
        user {
          id
          name
        }
      }
      owner {
        name
        id
      }
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
