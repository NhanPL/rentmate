import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, MenuItem } from '@mui/material';

type TenantFilterProps = {
  open: boolean;
  onClose: () => void;
  onFilter: (filter: { name: string; phone: string; status: string }) => void;
  initialFilter?: { name: string; phone: string; status: string };
};

const statusOptions = [
  { value: '', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

const TenantFilter: React.FC<TenantFilterProps> = ({
  open,
  onClose,
  onFilter,
  initialFilter = { name: '', phone: '', status: '' },
}) => {
  const [filter, setFilter] = React.useState(initialFilter);

  React.useEffect(() => {
    setFilter(initialFilter);
  }, [initialFilter, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filter);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Filter Tenants</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField label="Name" name="name" value={filter.name} onChange={handleChange} fullWidth autoFocus />
            </Grid>
            <Grid size={12}>
              <TextField label="Phone" name="phone" value={filter.phone} onChange={handleChange} fullWidth />
            </Grid>
            <Grid size={12}>
              <TextField select label="Status" name="status" value={filter.status} onChange={handleChange} fullWidth>
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Filter
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TenantFilter;
