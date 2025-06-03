import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

type TableCommonProps = {
  header: React.ReactNode;
  data: object[];
  headName: string[];
};

const TableCommon: React.FC<TableCommonProps> = ({ header, headName, data }) => {
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
          {data.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {Object.entries(row).map(([key, value]) => (
                <TableCell key={key}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableCommon;
