import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import React from 'react';

type TenantFilterProps = {
  open: boolean;
  onClose: () => void;
  onFilter: (filter: { name: string; phone: string; room: string }) => void;
  initialFilter?: { name: string; phone: string; room: string };
};

const TenantFilter: React.FC<TenantFilterProps> = ({
  open,
  onClose,
  onFilter,
  initialFilter = { name: '', phone: '', room: '' },
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
              <TextField label="Room" name="room" value={filter.room} onChange={handleChange} fullWidth />
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
