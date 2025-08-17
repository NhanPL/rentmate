import {
  Box,
  Button,
  Dialog,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import UploadFileButton from '../../uploadFileButton/UploadFileButton';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Apartment } from '../../../types';

const apartmentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, 'Name must be at least 3 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  size: z.string().min(3, 'Size is required (e.g., 1000 sqft)'),
  rentAmount: z.coerce.number().min(0, 'Rent amount cannot be negative'),
  status: z.enum(['availabled', 'occupied', 'maintenance']).optional(),
});

type ApartmentFormData = z.infer<typeof apartmentSchema>;

interface ApartmentFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Apartment;
}

const FormApartments: React.FC<ApartmentFormDialogProps> = ({ isOpen, onClose, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset: formReset,
  } = useForm<ApartmentFormData>({
    resolver: zodResolver(apartmentSchema),
    defaultValues: initialData || {
      name: '',
      address: '',
      size: '',
      rentAmount: 0,
      status: 'availabled',
    },
  });

  const onSubmit = (data: ApartmentFormData) => {
    console.log('Submitted data:', data);
    onClose(); // Close the dialog after submission
  };

  React.useEffect(() => {
    if (initialData) {
      formReset(initialData);
    } else {
      formReset({
        name: '',
        address: '',
        size: '',
        rentAmount: 0,
        status: 'availabled',
      });
    }
  }, [initialData, formReset, isOpen]);
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
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
          FORM APARTMENT
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ height: '100%', padding: '8px', overflow: 'auto' }}
        >
          <Box sx={{ padding: '16px 0' }}>
            <TextField
              id="outlined-basic"
              label="Name Apartments"
              variant="outlined"
              fullWidth
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
            />
          </Box>
          <TextField
            id="outlined-basic"
            label="Location"
            variant="outlined"
            fullWidth
            {...register('address')}
            error={!!errors.address}
            helperText={errors.address ? errors.address.message : ''}
          />
          <Box sx={{ display: 'flex', gap: 2, padding: '16px 0' }}>
            <TextField
              id="outlined-basic"
              label="Price"
              variant="outlined"
              type="number"
              fullWidth
              {...register('size')}
              error={!!errors.size}
              helperText={errors.size ? errors.size.message : ''}
            />
            <FormControl fullWidth error={!!errors.status}>
              <InputLabel id="demo-simple-select-label">Status:</InputLabel>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Status"
                    {...field}
                    value={field.value || ''}
                  >
                    <MenuItem value={'availabled'}>Availabled</MenuItem>
                    <MenuItem value={'occupied'}>Occupied</MenuItem>
                    <MenuItem value={'maintaince'}>Maintaince</MenuItem>
                  </Select>
                )}
              />

              {errors.status && <FormHelperText>{errors.status.message}</FormHelperText>}
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, padding: '16px 0' }}>
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
              Images:
            </Typography>
            <UploadFileButton
              accept=".jpg,.png,.pdf"
              onFileChange={(file) => console.log('File được chọn:', file)}
              previewImg
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, gap: 2 }}>
            <Button variant="contained" color="secondary" type="reset" onClick={onClose}>
              Close
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default FormApartments;
