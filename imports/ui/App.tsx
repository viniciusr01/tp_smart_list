import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { ProdutosCollection } from '../api/ProdutosCollection.jsx';
import { useTracker } from 'meteor/react-meteor-data';
import { CrudProduto } from './CrudProduto.tsx';
import { Produto } from './Produto.tsx';
import { Login } from './Login.tsx';

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const [filter, setFilter] = React.useState({});
  const userFilter = user ? { userId: user._id } : {};
  const produtos = useTracker(() => {
    if (!user) { return []; }
    return ProdutosCollection.find({ ...filter, userFilter }, { sort: { nome: 1 } }).fetch()
  });
  const deslogar = () => Meteor.logout();
  const quantidadeProdutos = useTracker(() => {
    if (!user) { return []; }
    return ProdutosCollection.find(filter).count()
  });

  return (
    user ? (
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: '10% 15%' }}>
        <Box sx={{display: 'flex', width: '100%', justifyContent: 'end'}}>
          <Button onClick={deslogar}>
            Deslogar
          </Button>
        </Box>
        <h1>Lista de compras ({quantidadeProdutos})</h1>

        <TextField
          onChange={(e) => setFilter({ nome: e.target.value })}
          placeholder="Pesquisar produto"
        />

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>

          {produtos.map((produto) => {
            return (
              <Box>
                <Produto produto={produto} />
              </Box>
            )
          })}

          <CrudProduto usuario={user} />

        </Box>
      </Box>
    ) : (
      <Login />
    )
  )
};
