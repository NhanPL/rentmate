import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Dialog, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Apartment } from '../../../types';
import UploadFileButton from '../../uploadFileButton/UploadFileButton';
import { addApartment, updateApartment } from '../../../api/apartment';
import { uploadFile } from '../../../api/upload';

const apartmentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, 'Name must be at least 3 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  fileUrl: z.string().optional(),
  fileId: z.string().optional(),
});

export type ApartmentFormData = z.infer<typeof apartmentSchema>;

interface ApartmentFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Apartment;
}

const FormApartments: React.FC<ApartmentFormDialogProps> = ({ isOpen, onClose, initialData }) => {
  const [file, setFile] = React.useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<ApartmentFormData>({
    resolver: zodResolver(apartmentSchema),
    defaultValues: initialData || {
      name: '',
      address: '',
      fileUrl: '',
      fileId: '',
    },
  });

  const onSubmit = async (data: ApartmentFormData) => {
    try {
      if (initialData) {
        // Update existing apartment
        await updateApartment(initialData.id, data);
      } else {
        if (file) {
          const { url: fileUrl, public_id: fileId } = await uploadFile(file);
          data = { ...data, fileUrl, fileId };
        }
        // Add new apartment
        await addApartment(data);
      }
      onClose(); // Close the dialog after submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  React.useEffect(() => {
    if (initialData) {
      formReset(initialData);
    } else {
      formReset({
        name: '',
        address: '',
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
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
              Images:
            </Typography>
            <UploadFileButton accept=".jpg,.png,.pdf" onFileChange={(file) => setFile(file)} previewImg />
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
