import { Delete, Edit, Home, MoreVert, Visibility } from '@mui/icons-material';
import { Box, Button, Card, Typography } from '@mui/material';
import { message } from 'antd';
import { PlusCircle } from 'lucide-react';
import React, { useCallback, useEffect } from 'react';
import { getAllTenants } from '../../api/tenant';
import { RentalForm } from '../../components/form/formRental/FormRental';
import FormTenant from '../../components/form/formTenant/FormTenant';
import PositionedMenu, { SharedMenuItem } from '../../components/positionedMenu/PositionedMenu';
import TableCommon from '../../components/tableCommon/TableCommon';
import { formatDate } from '../../utils/format';
import TenantFilter from './TenantFilter';
import type { TenantDTO, TenantMode } from './types';

const Tenants: React.FC = () => {
  const [openForm, setOpenForm] = React.useState(false);
  const [openFormRental, setOpenFormRental] = React.useState(false);
  const [openFilter, setOpenFilter] = React.useState(false);
  const [filterKeyword, setFilterKeyword] = React.useState({ name: '', phone: '', room: '' });
  const [tenants, setTenants] = React.useState<TenantDTO[]>([]);
  const [mode, setMode] = React.useState<TenantMode>('CREATE');
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [selectedRowId, setSelectedRowId] = React.useState<string>('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const filteredTenants = (data: { name: string; phone: string; room: string }) => {
    setFilterKeyword(data);
  };

  const fetchTenants = useCallback(async () => {
    try {
      const tenantData = await getAllTenants();
      setTenants(tenantData);
    } catch {
      message.error('Không thể tải danh sách người thuê');
    }
  }, []);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleToggleFormRental = () => {
    if (openFormRental) {
      setSelectedRowId('');
    }
    setOpenFormRental(!openFormRental);
  };

  const headName = ['Name', 'Card ID', 'Gender', 'Birthday', 'Phone', 'Room', 'Apartment', 'Actions'];

  const handleEditTenant = (id: string) => {
    if (!id) {
      message.error('Không tìm thấy tenant id để chỉnh sửa');
      return;
    }

    setMode('UPDATE');
    setEditingId(id);
    setOpenForm(true);
  };

  const menuItems: SharedMenuItem[] = [
    {
      label: 'Xem chi tiết',
      color: 'primary',
      icon: <Visibility fontSize="small" />,
      onClick: () => {},
    },
    {
      label: 'Chỉnh sửa',
      color: 'info',
      icon: <Edit fontSize="small" />,
      onClick: handleEditTenant,
    },
    {
      label: 'Thuê phòng',
      color: 'warning',
      icon: <Home fontSize="small" />,
      onClick: () => {
        handleToggleFormRental();
      },
    },
    {
      label: 'Xoá',
      color: 'error',
      icon: <Delete fontSize="small" />,
      onClick: () => {},
    },
  ];

  const data = tenants.map((tenant, idx) => ({
    name: tenant.name,
    cardId: tenant.cardId,
    gender: tenant.gender,
    birthday: formatDate(tenant.birthday || ''),
    phone: tenant.phone,
    room: tenant.roomName || '---',
    apartment: tenant.apartmentName || '---',
    actions: (
      <div key={idx}>
        <Button variant="text" color="primary" onClick={(e) => handleOpenMenu(e, tenant.id)} aria-label="more">
          <MoreVert />
        </Button>
      </div>
    ),
  }));

  useEffect(() => {
    fetchTenants();
  }, [fetchTenants]);

  return (
    <Box className="flex flex-col gap-6 p-4">
      <Box className="flex items-center justify-between mb-4">
        <Typography variant="h5" fontWeight={700}>
          List Tenant
        </Typography>
        <Box className="flex gap-2">
          <Button variant="outlined" onClick={() => setOpenFilter(true)}>
            Filter
          </Button>
          <Button
            variant="outlined"
            startIcon={<PlusCircle size={20} />}
            onClick={() => {
              setMode('CREATE');
              setEditingId(null);
              setOpenForm(true);
            }}
          >
            Add Tenant
          </Button>
        </Box>
      </Box>
      <Card>
        <TableCommon headName={headName} data={data} isPanigation />
      </Card>
      <FormTenant
        open={openForm}
        mode={mode}
        editingId={editingId}
        onSuccess={fetchTenants}
        onClose={() => {
          setOpenForm(false);
          setEditingId(null);
          setMode('CREATE');
        }}
      />
      <RentalForm open={openFormRental} onClose={handleToggleFormRental} tenantId={selectedRowId}></RentalForm>
      <TenantFilter
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        onFilter={filteredTenants}
        initialFilter={filterKeyword}
      />
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
        id={selectedRowId}
      ></PositionedMenu>
    </Box>
  );
};

export default Tenants;
