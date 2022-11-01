import { Box, TextField } from '@mui/material';
import React from 'react';
import { ProdutosCollection } from '../api/ProdutosCollection.jsx';
import { useTracker } from 'meteor/react-meteor-data';
import { CrudProduto } from './CrudProduto.tsx';
import { Produto } from './Produto.tsx';

export const App = () => {
  const [filter, setFilter] = React.useState({});
  const produtos = useTracker(() => ProdutosCollection.find(filter, {sort: { nome: 1 }}).fetch());
  const quantidadeProdutos = useTracker(() => ProdutosCollection.find(filter).count());

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', padding: '10% 15%'}}>
      <h1>Lista de compras ({quantidadeProdutos})</h1>

      <TextField
        onChange={(e) => setFilter({nome: e.target.value})}
        placeholder="Pesquisar produto"
      />

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>

        {produtos.map((produto) => {
          return (
            <Box>
              <Produto produto={produto}/>
            </Box>
          )
        })}

        <CrudProduto/>

      </Box>
    </Box>
  )
};
