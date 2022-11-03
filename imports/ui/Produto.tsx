import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Typography } from '@mui/material';

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
      <Typography sx={{width: '30%'}}>{produto.nome}</Typography>
      <Typography sx={{width: '10%'}}>{produto.quantidade}</Typography>
      <Typography sx={{width: '10%'}}>R$ {produto.valor}</Typography>
      <DeleteIcon onClick={removerProduto} sx={{fontSize: '35px', cursor: 'pointer', color: '#0080df'}}/>
    </Box>
  )
};