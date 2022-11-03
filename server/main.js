import { Meteor } from 'meteor/meteor';
import { ProdutosCollection } from '../imports/api/db/ProdutosCollection';
import '/imports/api/ProdutoMetodos';
import '/imports/api/ProdutosPublications';

const ADMIN_LOGIN = 'admin';
const ADMIN_SENHA = 'admin';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(ADMIN_LOGIN)) {
    Accounts.createUser({
      username: ADMIN_LOGIN,
      password: ADMIN_SENHA,
    });
  }

});