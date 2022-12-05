import { Box, Button, Icon, TextField, Typography } from '@mui/material';
import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Accounts } from 'meteor/accounts-base';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [telaCadastro, setTelaCadastro] = React.useState(false);

  const logar = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password);
  };

  const cadastrar = (e)=> {
    e.preventDefault();

    Accounts.createUser({
      username: username,
      password: password,
    });

  };

  return (
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
            width: '600px',
            height: '400px',
            background: 'white',
            boxShadow: "0px 2px 14px rgba(0, 0, 0, 0.25)",
            padding: '5rem',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '20px'
          }}
        >

          <Typography variant="h3" sx={{ color: '#0080df', marginBottom: '2rem', alignItems: 'center' }}>
            <AssignmentIcon sx={{ fontSize: 60, padding: 0 }} />
            Lista de Compras
          </Typography>

          <Typography variant="h5" sx={{ marginBottom: '2rem' }}> 
            {telaCadastro ? 'Cadastrar' : 'Entrar'}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', maxWidth: '70%', gap: '1rem' }}>
            <TextField
              id="filled-required"
              data-id= "user-input"
              label="Usuario"
              variant="filled"
              fullWidth
              required
              onChange={e => setUsername(e.target.value)}
            >
            </TextField>

            <TextField
              id="filled-password-input"
              data-id= "password-input"
              label="Senha"
              type="password"
              autoComplete="current-password"
              variant="filled"
              required
              fullWidth
              onChange={e => setPassword(e.target.value)}
            >
            </TextField>

            {!telaCadastro &&
            <>
              <Button onClick={logar} data-id= "login-button" variant="contained" sx={{ width: '100%' }} color="primary">
                Entrar
              </Button>

              <Button 
                onClick={() => setTelaCadastro(true)} 
                variant="contained" 
                sx={{ width: '100%', background: 'white', color: 'black' }} 
                color="primary"
              >
                Cadastrar
              </Button>
            </>
            }

            {telaCadastro &&
            <>
              <Button 
              onClick={cadastrar} 
              variant="contained" 
              sx={{ width: '100%' }} 
              color="primary"
            >
              Cadastrar
            </Button>

            <Button 
              onClick={() => setTelaCadastro(false)} 
              variant="contained" 
              sx={{ width: '100%', background: 'white', color: 'black' }} 
              color="primary"
            >
              Voltar
            </Button>
            </>
            }
          </Box>
        </Box>
      </Box>
  );
};