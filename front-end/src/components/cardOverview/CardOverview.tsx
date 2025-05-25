import { Box, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import React from 'react';

type CardOverviewProps = {
  title: string;
  count: number;
  icon: React.ReactNode;
  iconBgClr?: string;
};

const CardOverview: React.FC<CardOverviewProps> = ({ title, count, icon, iconBgClr = 'tranparent' }) => {
  return (
    <Card sx={{ display: 'flex', padding: 3, gap: 2, borderRadius: 2, alignItems: 'center', width: '100%' }}>
      <Box
        sx={{
          backgroundColor: iconBgClr,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 60,
          height: 60,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>{title}</Typography>
        <Typography variant="subtitle1" component="p" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          {count}
        </Typography>
      </Box>
    </Card>
  );
};

export default CardOverview;
