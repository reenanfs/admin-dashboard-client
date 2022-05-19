import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import {
  Pagination,
  Select,
  SelectChangeEvent,
  MenuItem,
  FormControl,
} from '@mui/material';

interface IGridPaginationProps {
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

const GridPagination = ({ pageSize, setPageSize }: IGridPaginationProps) => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <>
      <Pagination
        color="primary"
        variant="outlined"
        shape="rounded"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
        sx={{ ml: 12 }}
      />
      <FormControl size="small" sx={{ pr: 0 }}>
        <Select
          value={pageSize.toString()}
          onChange={handleSelectChange}
          sx={{ width: 100, mr: 2 }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default GridPagination;
