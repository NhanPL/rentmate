import { Button, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import React from 'react';
import { Link } from 'react-router';
import imgDefault from '../../assets/images/default.png';

type CardProductProps = {
  apartmentId: string;
  name: string;
  location: string;
  imageUrl?: string;
};

const CardProduct: React.FC<CardProductProps> = ({ apartmentId, name, location, imageUrl }) => {
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
          <p style={{ fontSize: '1rem', color: '#666' }}>Location: {location}</p>
        </div>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-start' }}>
        <Link to={`/apartments/${apartmentId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button variant="contained">View Details</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default CardProduct;
