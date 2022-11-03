import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

export const ProdutoAdd = () => {
  const [nome, setNome] = React.useState("");
  const [quantidade, setQuantidade] = React.useState("");
  const [valor, setValor] = React.useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!nome || !quantidade || !valor) return;

    Meteor.call('produto.inserir', nome, quantidade, valor)

    setNome("");
    setQuantidade("");
    setValor("");
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'end', gap: '2rem' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography>
          Produto
        </Typography>
        <TextField
          placeholder='Nome do produto'
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100px' }}>
        <Typography>
          Quantidade
        </Typography>
        <TextField
          type="number"
          placeholder='Ex.: 3'
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100px' }}>
        <Typography>
          Preço
        </Typography>
        <TextField
          value={valor}
          placeholder='Ex.: 2.50'
          onChange={(e) => setValor(e.target.value)}
          required
        />
      </Box>

      <Button sx={{color: 'white', textTransform: 'none', padding: '0 2rem'}} onClick={handleSubmit}>
        Adicionar
      </Button>
    </Box>
  )
};