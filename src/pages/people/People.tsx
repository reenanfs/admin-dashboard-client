import CustomDatagrid from 'components/tables/datagrid/DataGrid';

import { PeopleGridRowDef, label, columns, rows } from './peopleConfiguration';

const People = (): JSX.Element => {
  return (
    <>
      <CustomDatagrid<PeopleGridRowDef>
        rows={rows}
        columns={columns}
        label={label}
      />
    </>
  );
};

export default People;
