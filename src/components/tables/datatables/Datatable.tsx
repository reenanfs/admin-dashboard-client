import { useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import TableToolbar from '../toolbars/TableToolbar';

const rows = [
  {
    taskName: 'Task 1',
    description: 'Description 1',
    startDate: '23/04/2022',
    endDate: '24/04/2022',
    person: 'Renan',
  },
  {
    taskName: 'Task 2',
    description: 'Description 2',
    startDate: '23/04/2022',
    endDate: '24/04/2022',
    person: 'Karina',
  },
  {
    taskName: 'Task 3',
    description: 'Description 3',
    startDate: '23/04/2022',
    endDate: '24/04/2022',
    person: 'Irineu',
  },
];

const Datatable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Paper>
        <TableToolbar label="Manage your tasks" />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task Name</TableCell>
                <TableCell>Start Date</TableCell>

                <TableCell>Person</TableCell>
                <TableCell>End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Limpar a casa</TableCell>
                <TableCell>24/04/2022</TableCell>

                <TableCell>Renan</TableCell>
                <TableCell>24/04/2022</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 20]}
          component="div"
          count={1}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default Datatable;
