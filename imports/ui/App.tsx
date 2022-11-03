import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { ProdutosCollection } from '../api/db/ProdutosCollection.jsx';
import { useTracker } from 'meteor/react-meteor-data';
import { ProdutoAdd } from './ProdutoAdd';
import { Produto } from './Produto';
import { Login } from './Login';
import LogoutIcon from '@mui/icons-material/Logout';

export const App = () => {
  const { produtos, quantidadeProdutos, loading, user } = useTracker(() => {
    const user = Meteor.user();
    const filtrarUsuario = !!user && user ? { userId: user._id } : {};
    const subHandle = Meteor.subscribe('produtos');
    const produtos = subHandle?.ready() ? ProdutosCollection.find(filtrarUsuario, { sort: { nome: 1 } }).fetch() : [];
    const quantidadeProdutos = subHandle?.ready() ? ProdutosCollection.find(filtrarUsuario).count() : 0;
   
    return { produtos, quantidadeProdutos, loading: !!subHandle && !subHandle.ready(), user };
  })

  const [valorTotalLista, setValorTotalLista] = React.useState(0);
  const [produtoMaisCaro, setProdutoMaisCaro] = React.useState({nome: '', valor: 0});
  const [produtoMaisBarato, setProdutoMaisBarato] = React.useState({nome: '', valor: 0});

  React.useEffect(() => {
    Meteor.call('valorTotalLista', function(e, r) {setValorTotalLista(r)});
    Meteor.call('produtoMaisCaro', function(e, r) {setProdutoMaisCaro({nome: r.nome, valor: r.valor})});
    Meteor.call('produtoMaisBarato', function(e, r) {setProdutoMaisBarato({nome: r.nome, valor: r.valor})});
  },[quantidadeProdutos]);

  const deslogar = () => Meteor.logout();

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
            height: '80%',
            background: 'white',
            boxShadow: "0px 2px 14px rgba(0, 0, 0, 0.25)",
            padding: '3rem 5rem',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '20px'
          }}
        >

          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: '30px', fontWeight: '700', marginBottom: '2rem' }}>Bem vindo(a), {user.username} </Typography>
            <Button onClick={deslogar} sx={{ color: 'white' }}>
              <LogoutIcon sx={{ color: 'white', paddingRight: '1rem' }} /> Sair
            </Button>
          </Box>

          <Box sx={{ display: 'flex', width: '100%', gap: '2rem' }}>
            <Box sx={{ display: 'flex', width: '60%', flexDirection: 'column' }}>

              <ProdutoAdd />
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', margin: '2rem 0' }}>
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', borderBottom: '1px solid silver', marginBottom: '1rem' }}>
                  <Typography sx={{ fontSize: '20px', fontWeight: '700', width: '30%' }}>Produto</Typography>
                  <Typography sx={{ fontSize: '20px', fontWeight: '700', width: '10%' }}>Quantidade</Typography>
                  <Typography sx={{ fontSize: '20px', fontWeight: '700', width: '10%' }}>Preço</Typography>
                  <Typography sx={{ fontSize: '20px', fontWeight: '700', width: '10%' }}>Ações</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '500px', overflowY: 'auto' }}>
                  {loading && <Box>Carregando...</Box>}
                  {produtos.map((produto) => {
                    return (
                      <Produto produto={produto} />
                    )
                  })}
                </Box>
              </Box>

            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40%',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            > 
              <Typography sx={{fontSize: 30, fontWeight: 800}}>Detalhes da compra:</Typography>

              <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flexWrap: 'wrap', padding: '0.5rem', width: '150px', height: '150px', boxShadow: "0px 2px 14px rgba(0, 0, 0, 0.25)", borderRadius: '20px', background: 'linear-gradient(45deg, #0080df 30%, #289cff 90%);', }}>
              <Typography sx={{fontSize: 25, fontWeight: 500, color: 'white'}}>Valor</Typography>
              <Typography sx={{display: 'flex', fontSize: 30, fontWeight: 800, color: 'white'}}>R$ {valorTotalLista}</Typography>
              </Box>

              <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flexWrap: 'wrap', padding: '0.5rem', width: '150px', height: '150px', boxShadow: "0px 2px 14px rgba(0, 0, 0, 0.25)", borderRadius: '20px', background: 'linear-gradient(45deg, #0080df 30%, #289cff 90%);', }}>
              <Typography sx={{fontSize: 25, fontWeight: 500, color: 'white'}}>Quantidade </Typography>
              <Typography sx={{fontSize: 40, fontWeight: 800, color: 'white'}}>{quantidadeProdutos}</Typography>
              </Box>

              <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flexWrap: 'wrap', padding: '0.5rem', width: '150px', height: '150px', boxShadow: "0px 2px 14px rgba(0, 0, 0, 0.25)", borderRadius: '20px', background: 'linear-gradient(45deg, #0080df 30%, #289cff 90%);', }}>
              <Typography sx={{fontSize: 25, fontWeight: 500, color: 'white'}}>Mais caro</Typography>
              <Typography sx={{fontSize: 15, fontWeight: 800, color: 'white'}}>{produtoMaisCaro.nome}</Typography>
              <Typography sx={{fontSize: 30, fontWeight: 800, color: 'white'}}>R$ {produtoMaisCaro.valor}</Typography>
              </Box>

              <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flexWrap: 'wrap', padding: '0.5rem', width: '150px', height: '150px', boxShadow: "0px 2px 14px rgba(0, 0, 0, 0.25)", borderRadius: '20px', background: 'linear-gradient(45deg, #0080df 30%, #289cff 90%);', }}>
              <Typography sx={{fontSize: 25, fontWeight: 500, color: 'white'}}>Mais barato</Typography>
              <Typography sx={{fontSize: 15, fontWeight: 800, color: 'white'}}>{produtoMaisBarato.nome}</Typography>
              <Typography sx={{fontSize: 30, fontWeight: 800, color: 'white'}}>R$ {produtoMaisBarato.valor}</Typography>
              </Box>

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
