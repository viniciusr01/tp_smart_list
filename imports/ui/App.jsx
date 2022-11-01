import { Box } from '@mui/material';
import React from 'react';
import { ProdutosCollection } from '../api/ProdutosCollection.jsx';
import { useTracker } from 'meteor/react-meteor-data';
import { CrudProduto } from './CrudProduto.tsx';

export const App = () => {

  const produtos = useTracker(() => ProdutosCollection.find({}, {sort: { nome: 1 }}).fetch());

  return (
    <Box>
      <h1>Lista de compras</h1>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>

        {produtos.map((produto) => {
          return (
            <Box>
              {produto?.nome}
            </Box>
          )
        })}

        <CrudProduto/>

      </Box>
    </Box>
  )
};
