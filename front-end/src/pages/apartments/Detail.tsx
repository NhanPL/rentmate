import { ArrowLeft, MoreVert, Visibility } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box, Button, Card, CardContent, Chip, Typography } from '@mui/material';
import { DeleteIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import FormApartments from '../../components/form/formApartments/FormApartments';
import FormRoom from '../../components/form/formRoom/FormRoom';
import PositionedMenu, { SharedMenuItem } from '../../components/positionedMenu/PositionedMenu';
import TableCommon from '../../components/tableCommon/TableCommon';
import { formatNumberIntl } from '../../utils/format';
import { Link, useNavigate, useParams } from 'react-router';
import { Room } from '../../types/Room';
import { getRoomsByAparmentId } from '../../api/room';
import { getApartmentByID } from '../../api/apartment';
import { Apartment } from '../../types';

const ApartmentsDetail = () => {
  const [openFormApartments, setOpenFormApartments] = useState(false);
  const [isOpenFormRoom, setIsOpenFormRoom] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<string>('');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [room, setRoom] = useState<Room | null>(null);
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const { id } = useParams<{ id: string }>();
  const apartmentId = id!;

  const navigate = useNavigate();

  const handleToggleFormApartments = () => {
    setOpenFormApartments(!openFormApartments);
  };

  const openFormRoom = () => {
    setIsOpenFormRoom(!isOpenFormRoom);
  };

  const openFormUpdateRoom = (id: string) => {
    setRoom(rooms.find((item) => item.id === id) || null);
    setIsOpenFormRoom(!isOpenFormRoom);
  };

  const closeFormRoom = async (isFetching: boolean = false) => {
    if (isFetching) {
      const data = await getRoomsByAparmentId(apartmentId);
      setRooms(data);
    }
    setIsOpenFormRoom(!isOpenFormRoom);
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
      onClick: () => openFormUpdateRoom(selectedRowId),
    },
    {
      label: 'Xoá',
      icon: <DeleteIcon fontSize="small" />,
      onClick: () => alert('Xoá' + selectedRowId),
    },
  ];

  const changeViewDetailRoom = () => {
    navigate(`/apartments/1/rooms/${selectedRowId}`);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const renderDataTable = () => {
    return rooms.map((item, index) => ({
      no: index + 1,
      name: item.name,
      type: item.type,
      size: item.size,
      price: formatNumberIntl(item.price),
      status:
        item.status == 'availabled' ? (
          <Chip label="Availabled" color="success" />
        ) : item.status == 'occupied' ? (
          <Chip label="Occupied" color="error" />
        ) : (
          <Chip label="Maintaince" color="warning" />
        ),
      actions: (
        <div key={index}>
          <Button variant="text" color="primary" onClick={(e) => handleOpenMenu(e, item.id)} aria-label="more">
            <MoreVert />
          </Button>
        </div>
      ),
    }));
  };

  useEffect(() => {
    document.title = 'Apartment Detail';
    const fetchRooms = async () => {
      const data = await getRoomsByAparmentId(apartmentId);
      setRooms(data);
    };

    const fetchApartmentById = async () => {
      const data = await getApartmentByID(apartmentId);
      setApartment(data);
    };
    fetchRooms();
    fetchApartmentById();
  }, [apartmentId]);

  return (
    <Box component="div" sx={{ padding: 2, backgroundColor: '#FAFBFD' }}>
      <FormApartments isOpen={openFormApartments} onClose={handleToggleFormApartments} />
      <FormRoom isOpen={isOpenFormRoom} initialData={room} onClose={closeFormRoom} apartmentId={apartmentId} />
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
        <Button variant="outlined" color="success" onClick={openFormRoom} startIcon={<AddIcon />}>
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
            {apartment?.name}
          </Typography>
          <Typography variant="body1" className="mb-2">
            {apartment?.address}
          </Typography>
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
