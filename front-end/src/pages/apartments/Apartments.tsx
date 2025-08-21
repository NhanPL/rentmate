import { Box, Button, Skeleton } from '@mui/material';
import { PlusCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import imgApartment from '../../assets/images/apartment1.jpg';
import CardProduct from '../../components/cardProduct/CardProduct';
import FormApartments from '../../components/form/formApartments/FormApartments';
import { getAllApartments } from '../../api/apartment';

const Apartments: React.FC = () => {
  const [openForm, setOpenForm] = React.useState(false);
  const [apartments, setApartments] = useState<Array<{ name: string; price: number; location: string }>>([]);
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
  }, []);

  return (
    <Box className="flex flex-col gap-6 p-4">
      <Box className="text-right mb-4">
        <Button variant="outlined" startIcon={<PlusCircle size={20} />} onClick={() => setOpenForm(true)}>
          Add Apartment
        </Button>
      </Box>
      <Box
        component="div"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        sx={{ padding: 2, backgroundColor: '#FAFBFD' }}
      >
        {loading
          ? Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} variant="rectangular" height={200} />)
          : apartments.map((property, index) => (
              <CardProduct
                key={index}
                name={property.name}
                price={property.price}
                location={property.location}
                imageUrl={imgApartment}
              />
            ))}
      </Box>
      {/* FormApartment component ở đây nếu bạn có */}
      <FormApartments isOpen={openForm} onClose={handleCloseForm} />
    </Box>
  );
};

export default Apartments;
