import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ProdutosCollection } from '/imports/api/db/ProdutosCollection';




export const isLimitProduct = (quantidade) => {
    if(quantidade>10)
      throw new Meteor.Error('Quantidade de produtos passou do limite');
    else
      return 1 
}

 
Meteor.methods({
  'produto.inserir'(nome, quantidade, valor) {
    check(nome, String);
    check(quantidade, String);
    check(valor, String);

    quantidade = parseInt(quantidade);
    valor = parseFloat(valor);

    if(isLimitProduct(quantidade))

    if (!this.userId) { throw new Meteor.Error('Você não possui permissão para inserir produtos.'); }

    ProdutosCollection.insert({
      nome,
      quantidade,
      valor,
      createdAt: new Date,
      userId: this.userId,
    })
  },

  'produto.remover'(produtoId) {
    check(produtoId, String);
    
    if (!this.userId) { throw new Meteor.Error('Você não possui permissão para remover esse produto.'); }
    const produto = ProdutosCollection.findOne({ _id: produtoId, userId: this.userId });
    if (!produto) { throw new Meteor.Error('O produto não existe.'); }

    ProdutosCollection.remove(produtoId);
  },

  'produto.editar'(produtoId, nome) {
    check(produtoId, String);
    check(produtoId, String);
    
    
    if (!this.userId) { throw new Meteor.Error('Você não possui permissão para editar esse produto.'); }
    const produto = ProdutosCollection.findOne({ _id: produtoId, userId: this.userId });
    if (!produto) { throw new Meteor.Error('O produto não existe.'); }
    
    ProdutosCollection.update(produtoId, {
      $set: {
        nome: nome
      }
    });
  }
});