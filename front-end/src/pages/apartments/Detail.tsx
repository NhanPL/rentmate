import { ArrowLeft, MoreVert, Visibility } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box, Button, Card, CardContent, Chip, Typography } from '@mui/material';
import { DeleteIcon } from 'lucide-react';
import { useState } from 'react';
import FormApartments from '../../components/form/formApartments/FormApartments';
import FormRoom from '../../components/form/formRoom/FormRoom';
import PositionedMenu, { SharedMenuItem } from '../../components/positionedMenu/PositionedMenu';
import TableCommon from '../../components/tableCommon/TableCommon';
import { formatNumberIntl } from '../../utils/format';
import data from './dataListRoom.json';
import { Link, useNavigate } from 'react-router';

const ApartmentsDetail = () => {
  const [openFormApartments, setOpenFormApartments] = useState(false);
  const [openFormRoom, setOpenFormRoom] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<number | string | null>(null);

  const navigate = useNavigate();

  const handleToggleFormApartments = () => {
    setOpenFormApartments(!openFormApartments);
  };

  const handleToggleFormRoom = () => {
    setOpenFormRoom(!openFormRoom);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const menuItems: SharedMenuItem[] = [
    {
      label: 'Xem chi tiết',
      icon: <Visibility fontSize="small" />,
      onClick: () => changeViewDetailRoom(),
    },
    {
      label: 'Chỉnh sửa',
      icon: <EditIcon fontSize="small" />,
      onClick: () => alert('Chỉnh sửa' + selectedRowId),
    },
    {
      label: 'Xoá',
      icon: <DeleteIcon fontSize="small" />,
      onClick: () => alert('Xoá' + selectedRowId),
    },
  ];

  const changeViewDetailRoom = () => {
    navigate(`/Apartments/1/rooms/${selectedRowId}`);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
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
          <Button variant="text" color="primary" onClick={(e) => handleOpenMenu(e, index)} aria-label="more">
            <MoreVert />
          </Button>
        </div>
      ),
    }));
  };

  return (
    <Box component="div" sx={{ padding: 2, backgroundColor: '#FAFBFD' }}>
      <FormApartments isOpen={openFormApartments} onClose={handleToggleFormApartments} />
      <FormRoom isOpen={openFormRoom} onClose={handleToggleFormRoom} />
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
        id={''}
      ></PositionedMenu>

      <Box component={'div'} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginBottom: 2 }}>
        <Link to={`/Apartments`}>
          <Button variant="outlined">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Apartment
          </Button>
        </Link>
        <Button variant="outlined" color="success" onClick={handleToggleFormRoom} startIcon={<AddIcon />}>
          Add Room
        </Button>
        <Button variant="outlined" color="warning" onClick={handleToggleFormApartments} startIcon={<EditIcon />}>
          Edit
        </Button>
        <Button variant="outlined" color="info" startIcon={<FilterAltIcon />}>
          Filter
        </Button>
      </Box>

      <Card className="shadow-sm mb-8">
        <CardContent>
          <Typography variant="h4" fontWeight="bold">
            Property Three
          </Typography>
          <Typography variant="body1" className="mb-2">
            456 Elm St, Springfield, USA
          </Typography>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <strong>Size:</strong> 1200 sqft
            </div>
            <div>
              <strong>Total Rooms:</strong> 3
            </div>
            <div>
              <strong>Base Rent:</strong> $1,500
            </div>
            <div>
              <strong>Status:</strong> <span className="capitalize">occupied</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Box>
        <TableCommon
          headName={['No.', 'Name', 'Type', 'size', 'Price', 'Status', 'Actions']}
          data={renderDataTable()}
        />
      </Box>
    </Box>
  );
};

export default ApartmentsDetail;
