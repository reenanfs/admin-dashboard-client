import { gql, useQuery } from '@apollo/client';
import CustomDatagrid from 'components/tables/datagrid/DataGrid';

import { PeopleGridRowDef, label, columns } from './peopleConfiguration';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      role
      email
    }
  }
`;

const People = (): JSX.Element => {
  const { loading, data } = useQuery(GET_USERS);

  let rows: PeopleGridRowDef[] = [];

  if (!loading) {
    rows = data.users;
  }

  return (
    <>
      <CustomDatagrid<PeopleGridRowDef>
        loading={loading}
        rows={rows}
        columns={columns}
        label={label}
      />
    </>
  );
};

export default People;
