import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import React from 'react';

type TableCommonProps = {
  header?: React.ReactNode;
  data: object[];
  headName: string[];
  isPanigation?: boolean;
};

const TableCommon: React.FC<TableCommonProps> = ({ header, headName, data, isPanigation = false }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer
        component={'div'}
        sx={{
          backgroundColor: 'white',
          borderRadius: 1,
          boxShadow: 1,
          maxHeight: '500px',
        }}
      >
        {header}
        <Table sx={{ minWidth: 250 }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headName.map((head) => (
                <TableCell key={head} className="text-center">
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              (rowsPerPage > 0 && isPanigation
                ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : data
              ).map((row, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  {Object.entries(row).map(([key, value]) => (
                    <TableCell key={key} className="text-center">
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={headName.length} className="h-24 text-center text-muted-foreground">
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {isPanigation && (
        <TablePagination
          rowsPerPageOptions={[5, 12, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default TableCommon;
