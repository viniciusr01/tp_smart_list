import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

export const Produto = ({ produto }) => {

  const removerProduto = () => {
    Meteor.call('produto.remover', produto._id);
  }

  return (
    <Box 
      sx={{
        display: 'flex', 
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        borderBottom: '1px solid silver', 
        height: '3rem'
      }}
    >
      <h3>{produto.nome}</h3>
      <IconButton onClick={removerProduto}>
        <DeleteIcon/>
      </IconButton>
    </Box>
  )
};