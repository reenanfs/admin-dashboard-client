import { GRAPHQL_ENDPOINT } from 'graphql/constants';
import { createUploadLink } from 'apollo-upload-client';

export const UploadAndHttpLink = createUploadLink({
  uri: GRAPHQL_ENDPOINT,
  credentials: 'include',
});
