import { DocumentNode } from 'graphql';

export interface mockData<T> {
  request: {
    query: DocumentNode;
    variables?: Object;
  };
  result: {
    data: T;
  };
}
