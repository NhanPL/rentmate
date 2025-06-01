import { Box } from '@mui/material';
import CardProduct from '../../components/cardProduct/CardProduct';
import imgApartment from '../../assets/images/apartment1.jpg';
import data from './data.json';

const Properties = () => {
  return (
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
  );
};

export default Properties;
