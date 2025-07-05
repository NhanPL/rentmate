import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

export type TenantFormData = {
  name: string;
  contactInfo: string;
  leaseStartDate: string;
  leaseEndDate: string;
};

type FormTenantProps = {
  open: boolean;
  onClose: () => void;
  // onSubmit: (data: TenantFormData) => void;
  initialData?: TenantFormData;
};

const defaultForm: TenantFormData = {
  name: '',
  contactInfo: '',
  leaseStartDate: '',
  leaseEndDate: '',
};

const FormTenant: React.FC<FormTenantProps> = ({ open, onClose, initialData }) => {
  const { control, handleSubmit, reset } = useForm<TenantFormData>({
    defaultValues: initialData || defaultForm,
  });

  React.useEffect(() => {
    reset(initialData || defaultForm);
  }, [initialData, open, reset]);

  const onSubmitForm = (data: TenantFormData) => {
    // onSubmit(data);
    console.log(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Edit Tenant' : 'Add Tenant'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmitForm)} autoComplete="off">
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={12}>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <TextField {...field} label="Name" fullWidth required />}
              />
            </Grid>
            <Grid size={12}>
              <Controller
                name="contactInfo"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <TextField {...field} label="Contact Info" fullWidth required />}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="leaseStartDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Lease Start Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                  />
                )}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="leaseEndDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Lease End Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {initialData ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormTenant;
