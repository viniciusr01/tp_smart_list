import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ProdutosCollection } from '/imports/api/db/ProdutosCollection';
 
Meteor.methods({
  'produto.inserir'(nome) {
    check(nome, String);

    if (!this.userId) { throw new Meteor.Error('Você não possui permissão para inserir produtos.'); }

    ProdutosCollection.insert({
      nome,
      createdAt: new Date,
      userId: this.userId,
    })
  },

  'produto.remover'(produtoId) {
    check(produtoId, String);

    const produto = ProdutosCollection.findOne({ _id: produtoId, userId: this.userId });
    if (!produto) { throw new Meteor.Error('O produto não existe.'); }
    if (!this.userId) { throw new Meteor.Error('Você não possui permissão para remover produtos.'); }

    ProdutosCollection.remove(produtoId);
  },

  'produto.editar'(produtoId, nome) {
    check(produtoId, String);
    check(produtoId, String);
    
    const produto = ProdutosCollection.findOne({ _id: produtoId, userId: this.userId });
    if (!produto) { throw new Meteor.Error('O produto não existe.'); }
    if (!this.userId) { throw new Meteor.Error('Você não possui permissão para editar esse produto.'); }

    ProdutosCollection.update(produtoId, {
      $set: {
        nome: nome
      }
    });
  }
});