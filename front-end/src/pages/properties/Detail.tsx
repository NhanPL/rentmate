import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box, Button, Chip, Typography } from '@mui/material';
import { useState } from 'react';
import PositionedMenu, { SharedMenuItem } from '../../components/positionedMenu/PositionedMenu';
import TableCommon from '../../components/tableCommon/TableCommon';
import data from './dataListRoom.json';
import { DeleteIcon } from 'lucide-react';
import { formatNumberIntl } from '../../utils/format';

const PropertiesDetail = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const menuItems: SharedMenuItem[] = [
    {
      label: 'Chỉnh sửa',
      icon: <EditIcon fontSize="small" />,
      onClick: (i) => alert('Chỉnh sửa' + i),
    },
    {
      label: 'Xoá',
      icon: <DeleteIcon fontSize="small" />,
      onClick: (i) => alert('Xoá' + i),
    },
  ];

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const renderHeaderTable = () => {
    return (
      <Box component="div" sx={{ marginBottom: 2, backgroundColor: 'white' }}>
        <Typography variant="h4" fontWeight="bold">
          Property Three
        </Typography>
        <Typography variant="body1">456 Elm St, Springfield, USA</Typography>
      </Box>
    );
  };

  const renderDataTable = () => {
    return data.map((item, index) => ({
      no: index + 1,
      name: item.name,
      type: item.type,
      size: item.size,
      price: formatNumberIntl(item.price),
      status:
        item.status == 'Available' ? (
          <Chip label="Availabled" color="success" />
        ) : (
          <Chip label="Occupied" color="error" />
        ),
      actions: (
        <div key={index}>
          <Button variant="text" color="primary" onClick={handleOpenMenu}>
            <EditIcon />
          </Button>
          <PositionedMenu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            aria-labelledby="demo-positioned-button"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            items={menuItems}
            id={'' + index}
          ></PositionedMenu>
        </div>
      ),
    }));
  };

  return (
    <Box component="div" sx={{ padding: 2, backgroundColor: '#FAFBFD' }}>
      <Box component={'div'} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginBottom: 2 }}>
        <Button variant="outlined" color="primary" startIcon={<AddIcon />}>
          Add Tenant
        </Button>
        <Button variant="outlined" color="warning" startIcon={<EditIcon />}>
          Edit
        </Button>
        <Button variant="outlined" color="info" startIcon={<FilterAltIcon />}>
          Filter
        </Button>
      </Box>

      <Box>
        <TableCommon
          header={renderHeaderTable()}
          headName={['No.', 'Name', 'Type', 'size', 'Price', 'Status', 'Actions']}
          data={renderDataTable()}
        />
      </Box>
    </Box>
  );
};

export default PropertiesDetail;
