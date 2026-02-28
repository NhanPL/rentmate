import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Dialog, DialogActions, DialogContent, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { addTenant, updateTenant } from '../../../api/tenant';
import { formatDate } from '../../../utils/format';

export type TenantFormData = {
  name: string;
  email: string;
  phone: string;
  gender: string;
  cardId: string;
  location: string;
  birthday: string;
};

type FormTenantProps = {
  open: boolean;
  onClose: () => void;
  initialData?: TenantFormData & { id?: string };
};

const tenantSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  gender: z.string().nonempty('Gender is required'),
  cardId: z.string().min(9, 'Card ID must be at least 9 characters'),
  location: z.string().min(5, 'Location must be at least 5 characters'),
  birthday: z.string().nonempty('Birthday is required'),
});

const defaultForm: TenantFormData = {
  name: '',
  email: '',
  phone: '',
  gender: '',
  cardId: '',
  location: '',
  birthday: '',
};

const FormTenant: React.FC<FormTenantProps> = ({ open, onClose, initialData }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TenantFormData>({
    resolver: zodResolver(tenantSchema),
    defaultValues: initialData || defaultForm,
  });

  React.useEffect(() => {
    reset(initialData || defaultForm);
  }, [initialData, open, reset]);

  const onSubmitForm = async (data: TenantFormData) => {
    try {
      console.log(formatDate(data.birthday));
      const tenant = { ...data, id: initialData?.id || '', birthday: formatDate(data.birthday) };
      if (initialData?.id) {
        await updateTenant(initialData.id, tenant);
      } else {
        await addTenant(tenant);
      }
      onClose();
    } catch (error) {
      console.error('Error submitting tenant form:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          maxHeight: '90vh',
          flexWrap: 'nowrap',
          padding: '32px',
          paddingTop: '0px',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: 1,
            fontWeight: 'bold',
            padding: '16px 8px 0px 8px',
            borderBottom: '1px solid #E0E0E0',
          }}
          id="alert-dialog-title"
        >
          {initialData ? 'Edit Tenant' : 'Add Tenant'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmitForm)} autoComplete="off">
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      required
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      required
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone"
                      fullWidth
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      required
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Gender"
                      fullWidth
                      error={!!errors.gender}
                      helperText={errors.gender?.message}
                      required
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="cardId"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Card ID"
                      fullWidth
                      error={!!errors.cardId}
                      helperText={errors.cardId?.message}
                      required
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Location"
                      fullWidth
                      error={!!errors.location}
                      helperText={errors.location?.message}
                      required
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="birthday"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Birthday"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      error={!!errors.birthday}
                      helperText={errors.birthday?.message}
                      required
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
      </Box>
    </Dialog>
  );
};

export default FormTenant;
