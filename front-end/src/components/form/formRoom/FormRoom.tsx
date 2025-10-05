import { zodResolver } from '@hookform/resolvers/zod';
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
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import CurrencyInput from '../../currencyInput/CurrencyInput';
import { createRoom, updateRoom } from '../../../api/room';
import { Room } from '../../../types/Room';

const apartmentSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  type: z.string().min(1, 'Type is required'),
  price: z.coerce.number().min(0, 'Rent amount cannot be negative'),
  size: z.string().min(1, 'Size is required'),
  status: z.enum(['availabled', 'occupied', 'maintenance']),
});

type ApartmentFormData = z.infer<typeof apartmentSchema>;

interface ApartmentFormDialogProps {
  isOpen: boolean;
  onClose: (isRetching: boolean) => void;
  initialData: Room | null;
  apartmentId: string;
}

const FormRoom: React.FC<ApartmentFormDialogProps> = ({ isOpen, onClose, initialData, apartmentId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset: formReset,
  } = useForm<ApartmentFormData>({
    resolver: zodResolver(apartmentSchema),
    defaultValues: {
      name: initialData ? initialData.name : '',
      type: initialData ? initialData.type : '',
      price: initialData ? initialData.price : 0,
      size: initialData ? initialData.size : '',
      status: initialData ? initialData.status : 'availabled',
    },
  });

  const handleClose = (isFetching: boolean = false) => {
    onClose(isFetching);
  };

  const onSubmit = async (data: ApartmentFormData) => {
    const payload: Room = {
      apartmentId: apartmentId,
      id: '',
      ...data,
    };
    console.log('first', data);
    try {
      if (initialData != null) {
        payload.id = initialData.id;
        await updateRoom(payload.id, payload);
      } else {
        await createRoom(payload);
      }
    } catch (error) {
      console.log(error);
      return;
    }
    handleClose(true);
  };

  React.useEffect(() => {
    if (initialData) {
      formReset(initialData);
    } else {
      formReset({
        name: '',
        type: '',
        price: 0,
        status: 'availabled',
      });
    }
  }, [initialData, formReset, isOpen]);
  return (
    <Dialog
      open={isOpen}
      onClose={() => handleClose()}
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
          FORM ROOM
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ height: '100%', padding: '8px', overflow: 'auto' }}
        >
          <Box sx={{ padding: '16px 0' }}>
            <TextField
              id="outlined-basic"
              label="Name Room:"
              variant="outlined"
              fullWidth
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
            />
          </Box>
          <Box sx={{ padding: '16px 0' }}>
            <TextField
              id="outlined-basic"
              label="Room size:"
              variant="outlined"
              fullWidth
              {...register('size')}
              error={!!errors.size}
              helperText={errors.size ? errors.size.message : ''}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, padding: '16px 0' }}>
            <FormControl fullWidth error={!!errors.type}>
              <InputLabel id="demo-simple-select-label">Type:</InputLabel>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Type"
                    {...field}
                    value={field.value}
                  >
                    <MenuItem value={'1'}>Single room</MenuItem>
                    <MenuItem value={'2'}>Double room</MenuItem>
                  </Select>
                )}
              />
              {errors.type && <FormHelperText>{errors.type.message}</FormHelperText>}
            </FormControl>
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
          <Box sx={{ padding: '16px 0' }}>
            <Controller
              name="price"
              control={control}
              render={({ field }) => <CurrencyInput value={field.value} onChange={field.onChange} label="Price:" />}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, gap: 2 }}>
            <Button variant="contained" color="secondary" type="reset" onClick={() => handleClose()}>
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

export default FormRoom;
