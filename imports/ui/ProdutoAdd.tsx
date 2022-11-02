import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';

export const ProdutoAdd = () => {
  const [nome, setNome] = React.useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!nome) return;

    Meteor.call('produto.inserir', nome)

    setNome("");
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', width: '30%'}}>
        <TextField
          placeholder='Nome do produto'
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Button variant="outlined" onClick={handleSubmit}>
          Adicionar produto
        </Button>
    </Box>
  )
};