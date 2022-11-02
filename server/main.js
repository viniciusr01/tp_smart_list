import { Meteor } from 'meteor/meteor';
import { ProdutosCollection } from '../imports/api/ProdutosCollection';

const inserirProduto = (nomeProduto, user) => {
  ProdutosCollection.insert({ nome: nomeProduto, userId: user._id, createdAt: new Date(), });
}

const ADMIN_LOGIN = 'admin';
const ADMIN_SENHA = 'admin';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(ADMIN_LOGIN)) {
    Accounts.createUser({
      username: ADMIN_LOGIN,
      password: ADMIN_SENHA,
    });
  }

  const user = Accounts.findUserByUsername(ADMIN_LOGIN);

  if (ProdutosCollection.find().count() === 0) {
    [
      'Banana',
      'Maçã',
      'Laranja',
    ].forEach(nomeProduto => inserirProduto(nomeProduto, user));
  }
});