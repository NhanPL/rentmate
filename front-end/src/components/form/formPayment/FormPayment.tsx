import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Grid } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const statusOptions = [
  { value: 'Paid', label: 'Paid' },
  { value: 'Unpaid', label: 'Unpaid' },
];

export type PaymentFormData = {
  period: string;
  rent: string;
  electricity: string;
  electricOld: number;
  electricNew: number;
  water: string;
  waterOld: number;
  waterNew: number;
  totalDue: string;
  status: 'Paid' | 'Unpaid';
};

type FormPaymentProps = {
  open: boolean;
  onClose: () => void;
  initialData?: PaymentFormData;
};

const defaultForm: PaymentFormData = {
  period: '',
  rent: '',
  electricity: '',
  electricOld: 0,
  electricNew: 0,
  water: '',
  waterOld: 0,
  waterNew: 0,
  totalDue: '',
  status: 'Unpaid',
};

const FormPayment: React.FC<FormPaymentProps> = ({ open, onClose, initialData }) => {
  const { control, handleSubmit, reset } = useForm<PaymentFormData>({
    defaultValues: initialData || defaultForm,
  });

  React.useEffect(() => {
    reset(initialData || defaultForm);
  }, [initialData, open, reset]);

  const onSubmitForm = (data: PaymentFormData) => {
    console.log(data)
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Edit Payment' : 'Add Payment'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmitForm)} autoComplete="off">
        <DialogContent>
          <Grid container spacing={2} columnSpacing={{ xs: 12, sm: 6, md: 3 }} sx={{ mt: 1 }}>
            <Grid size={6}>
              <Controller
                name="period"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <TextField {...field} label="Period" fullWidth required />}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="rent"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <TextField {...field} label="Rent" fullWidth required />}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="electricity"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <TextField {...field} label="Electricity" fullWidth required />}
              />
            </Grid>
            <Grid size={3}>
              <Controller
                name="electricOld"
                control={control}
                rules={{ required: true, min: 0 }}
                render={({ field }) => (
                  <TextField {...field} label="Electric Old" type="number" inputProps={{ min: 0 }} fullWidth required />
                )}
              />
            </Grid>
            <Grid size={3}>
              <Controller
                name="electricNew"
                control={control}
                rules={{ required: true, min: 0 }}
                render={({ field }) => (
                  <TextField {...field} label="Electric New" type="number" inputProps={{ min: 0 }} fullWidth required />
                )}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="water"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <TextField {...field} label="Water" fullWidth required />}
              />
            </Grid>
            <Grid size={3}>
              <Controller
                name="waterOld"
                control={control}
                rules={{ required: true, min: 0 }}
                render={({ field }) => (
                  <TextField {...field} label="Water Old" type="number" inputProps={{ min: 0 }} fullWidth required />
                )}
              />
            </Grid>
            <Grid size={3}>
              <Controller
                name="waterNew"
                control={control}
                rules={{ required: true, min: 0 }}
                render={({ field }) => (
                  <TextField {...field} label="Water New" type="number" inputProps={{ min: 0 }} fullWidth required />
                )}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="totalDue"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <TextField {...field} label="Total Due" fullWidth required />}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="status"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField {...field} select label="Status" fullWidth required>
                    {statusOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
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

export default FormPayment;
