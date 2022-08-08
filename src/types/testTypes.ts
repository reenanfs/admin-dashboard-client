import { DocumentNode } from 'graphql';

export interface IMockData<T> {
  request: {
    query: DocumentNode;
    variables?: Object;
  };
  result: {
    data: T;
  };
}
