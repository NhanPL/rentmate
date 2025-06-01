import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

type TableCommonProps = {
  header: React.ReactNode;
  // data: string[];
  headName: string[];
};

const rows = [
  { name: 'Frozen yoghurt', location: 159 },
  { name: 'Ice cream sandwich', location: 237 },
  { name: 'Eclair', location: 262 },
  { name: 'Cupcake', location: 305 },
  { name: 'Gingerbread', location: 356 },
];

const TableCommon: React.FC<TableCommonProps> = ({ header, headName }) => {
  return (
    <TableContainer
      component={'div'}
      sx={{
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      {header}
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headName.map((head) => (
              <TableCell key={head}>{head}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableCommon;
