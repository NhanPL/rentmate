import { Box, Button, Skeleton } from '@mui/material';
import { PlusCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getAllApartments } from '../../api/apartment';
import CardProduct from '../../components/cardProduct/CardProduct';
import FormApartments from '../../components/form/formApartments/FormApartments';

const Apartments: React.FC = () => {
  const [openForm, setOpenForm] = React.useState(false);
  const [apartments, setApartments] = useState<Array<{ id: string; name: string; address: string; fileurl: string }>>(
    []
  );
  const [loading, setLoading] = useState(true);

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const data = await getAllApartments();
        setApartments(data);
      } catch (error) {
        console.error('Error fetching apartments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchApartments();
  }, [openForm]);
  return (
    <Box className="flex flex-col gap-6 p-4">
      <Box className="text-right mb-4">
        <Button variant="outlined" startIcon={<PlusCircle size={20} />} onClick={() => setOpenForm(true)}>
          Add Apartment
        </Button>
      </Box>
      <Box
        component="div"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative"
        sx={{ padding: 2, backgroundColor: '#FAFBFD', minHeight: '200px' }}
      >
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} variant="rectangular" height={200} />)
        ) : apartments.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              textAlign: 'center',
              color: '#666',
              position: 'absolute',
            }}
          >
            No apartments have been created yet. Please click the 'Add Apartment' button to create a new one.
          </Box>
        ) : (
          apartments.map((property, index) => (
            <CardProduct
              key={index}
              apartmentId={property.id}
              name={property.name}
              location={property.address}
              imageUrl={property.fileurl}
            />
          ))
        )}
      </Box>
      <FormApartments isOpen={openForm} onClose={handleCloseForm} />
    </Box>
  );
};

export default Apartments;
