import CustomDatagrid from 'components/tables/datagrid/DataGrid';

import { HomeGridRowDef, label, columns, rows } from './homeConfiguration';

const Home = (): JSX.Element => {
  return (
    <>
      <CustomDatagrid<HomeGridRowDef>
        rows={rows}
        columns={columns}
        label={label}
      />
    </>
  );
};

export default Home;
