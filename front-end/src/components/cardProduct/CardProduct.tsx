import { Button, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import React from 'react';
import imgDefault from '../../assets/images/default.png';
import { formatNumberIntl } from '../../utils/format';
import { Link } from 'react-router';

type CardProductProps = {
  name: string;
  price: number;
  location: string;
  imageUrl?: string;
};

const CardProduct: React.FC<CardProductProps> = ({ name, price, location, imageUrl }) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', borderRadius: 2, width: '100%' }}>
      <CardMedia
        sx={{
          minHeight: 150,
          objectFit: 'cover',
          borderRadius: '8px 8px 0 0',
        }}
        component="img"
        image={imageUrl ?? imgDefault}
        alt={name}
      />
      <CardContent>
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 'bold' }}>{name}</h2>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${formatNumberIntl(price)}</p>
          <p style={{ fontSize: '1rem', color: '#666' }}>Location: {location}</p>
        </div>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-start' }}>
        <Link to={`/properties/${name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button variant="contained">View Details</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default CardProduct;
