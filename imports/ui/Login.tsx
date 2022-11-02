import { Box, Button, TextField } from '@mui/material';
import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

export const Login = () => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const logar = e => {
    e.preventDefault();

    Meteor.loginWithPassword(nomeUsuario, senha);
  };

  return (
    <Box>
      <h2>Nome de usuário: </h2>

      <TextField
        placeholder="Digite o nome"
        name="nomeusuario"
        required
        onChange={(e) => setNomeUsuario(e.target.value)}
      />

      <h2>Senha: </h2>
      
      <TextField
        type="password"
        placeholder="Digite a senha"
        name="senha"
        required
        onChange={e => setSenha(e.target.value)}
      />

      <Button onClick={logar} variant="outlined">Entrar</Button>
    </Box>
  );
};