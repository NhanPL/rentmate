import { Box, Button, Card } from '@mui/material';
import { PlusCircle } from 'lucide-react';
import React from 'react';
import CardProduct from '../../components/cardProduct/CardProduct';
import imgApartment from '../../assets/images/apartment1.jpg';
import data from './data.json';
import FormProperties from '../../components/form/formProperties/FormProperties';

const Properties: React.FC = () => {
  const [openForm, setOpenForm] = React.useState(false);

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <Box className="flex flex-col gap-6 p-4">
      <Box className="text-right mb-4">
        <Button variant="outlined" startIcon={<PlusCircle size={20} />} onClick={() => setOpenForm(true)}>
          Add Apartment
        </Button>
      </Box>
      <Card>
        <Box
          component="div"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          sx={{ padding: 2, backgroundColor: '#FAFBFD' }}
        >
          {data.map((property, index) => (
            <CardProduct
              key={index}
              name={property.name}
              price={property.price}
              location={property.location}
              imageUrl={imgApartment}
            />
          ))}
        </Box>
      </Card>
      {/* FormApartment component ở đây nếu bạn có */}
      <FormProperties isOpen={openForm} onClose={handleCloseForm} />
    </Box>
  );
};

export default Properties;
