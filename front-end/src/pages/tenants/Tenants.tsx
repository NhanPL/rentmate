import { Box, Button, Card, IconButton, Typography } from '@mui/material';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';
import React from 'react';
import FormTenant, { TenantFormData } from '../../components/form/formTenant/FormTenant';
import TableCommon from '../../components/tableCommon/TableCommon';
import TenantFilter from './TenantFilter';

const initialTenants: TenantFormData[] = [
  {
    name: 'John Doe',
    contactInfo: '034-567-8901',
    leaseStartDate: '2023-01-01',
    leaseEndDate: '',
  },
  {
    name: 'Jane Smith',
    contactInfo: '012-345-6789',
    leaseStartDate: '2023-02-01',
    leaseEndDate: '2024-01-31',
  },
];

const Tenants: React.FC = () => {
  const [openForm, setOpenForm] = React.useState(false);
  const [openFilter, setOpenFilter] = React.useState(false);
  const [filterKeyword, setFilterKeyword] = React.useState({ name: '', phone: '', status: '' });
  const [tenants, setTenants] = React.useState<TenantFormData[]>(initialTenants);
  const [editTenant, setEditTenant] = React.useState<TenantFormData | null>(null);

  const filteredTenants = (data: { name: string; phone: string; status: string }) => {
    setFilterKeyword(data);
  };

  const headName = ['Name', 'Phone', 'Date start', 'Date end', 'Actions'];
  const data = tenants.map((tenant, idx) => ({
    name: tenant.name,
    contactInfo: tenant.contactInfo,
    leaseStartDate: tenant.leaseStartDate,
    leaseEndDate: tenant.leaseEndDate || '---',
    actions: (
      <>
        <IconButton
          color="primary"
          onClick={() => {
            setEditTenant(tenant);
            setOpenForm(true);
          }}
        >
          <Edit size={18} />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => {
            setTenants((prev) => prev.filter((_, i) => i !== idx));
          }}
        >
          <Trash2 size={18} />
        </IconButton>
      </>
    ),
  }));

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
              setEditTenant(null);
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
        onClose={() => {
          setOpenForm(false);
          setEditTenant(null);
        }}
        initialData={editTenant || undefined}
      />
      <TenantFilter
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        onFilter={filteredTenants}
        initialFilter={filterKeyword}
      />
    </Box>
  );
};

export default Tenants;
