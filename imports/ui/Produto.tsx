import { Box } from '@mui/system';
import React from 'react';

export const Produto = ({ produto }) => {

  return (
    <Box sx={{display: 'flex', width: '100%', alignItems: 'center', borderBottom: '1px solid silver', height: '3rem'}}>
      <h3>{produto.nome}</h3>
    </Box>
  )
};