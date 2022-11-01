import { Meteor } from 'meteor/meteor';
import { ProdutosCollection } from '../imports/api/ProdutosCollection';

const inserirProduto = (nomeProduto) => {
  ProdutosCollection.insert({ nome: nomeProduto });
}

Meteor.startup(() => {
  if (ProdutosCollection.find().count() === 0) {
    [
      'Banana',
      'Maçã',
      'Laranja',
    ].forEach(inserirProduto)
  }
});