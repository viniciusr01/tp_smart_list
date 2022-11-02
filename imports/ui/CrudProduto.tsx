import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { ProdutosCollection } from '../api/ProdutosCollection';

export const CrudProduto = ({ produto, usuario }) => {
  const [nome, setNome] = React.useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!nome) return;

    ProdutosCollection.insert({
      nome: nome.trim(),
      createdAt: new Date(),
      userId: usuario._id,
    });

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