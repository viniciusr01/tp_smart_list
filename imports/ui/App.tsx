import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { ProdutosCollection } from '../api/db/ProdutosCollection.jsx';
import { useTracker } from 'meteor/react-meteor-data';
import { ProdutoAdd } from './ProdutoAdd';
import { Produto } from './Produto';
import { Login } from './Login';

export const App = () => {

  const { produtos, quantidadeProdutos, loading, user } = useTracker(() => {
    const user = Meteor.user();
    const filtrarUsuario = user ? { userId: user._id } : {};
    const subHandle = Meteor.subscribe('produtos');
    const produtos = subHandle?.ready() ? ProdutosCollection.find(filtrarUsuario, { sort: { nome: 1 } }).fetch() : [];
    const quantidadeProdutos = subHandle?.ready() ? ProdutosCollection.find(filtrarUsuario).count() : 0;

    return { produtos, quantidadeProdutos, loading: !!subHandle && !subHandle.ready(), user };
  })

  const [filter, setFilter] = React.useState({});
  const deslogar = () => Meteor.logout();
  console.log(user)
  return (
    user ? (

      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ebebeb'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '60%',
            height: '60%',
            background: 'white',
            boxShadow: "0px 2px 14px rgba(0, 0, 0, 0.25)",
            padding: '5rem',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '20px'
          }}
        >

          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'end' }}>
            <Button onClick={deslogar}>
              Deslogar
            </Button>
          </Box>
          <h1>Lista de compras ({quantidadeProdutos})</h1>
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ display: 'flex', width: '60%', flexDirection: 'column' }}>
             
              <ProdutoAdd />
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', margin: '2rem 0' }}>

                {loading && <Box>Carregando...</Box>}
                {produtos.map((produto) => {
                  return (
                    <Box>
                      <Produto produto={produto} />
                    </Box>
                  )
                })}
              </Box>
              <TextField
                onChange={(e) => setFilter({ nome: e.target.value })}
                placeholder="Pesquisar produto"
              />

            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' , alignItems: 'center', justifyContent: 'center', width: '40%' }}>
              Total da lista de compra e pensar talvez na possibilidade de adicionar categoria kkkkk
            </Box>
          </Box>
        </Box>
      </Box>
    ) : (
      <>
        <Login />
      </>
    )
  )
};
