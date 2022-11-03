import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ProdutosCollection } from '/imports/api/db/ProdutosCollection';




export const eLimiteDeProduto = (quantidade) => {
    if(quantidade>10)
      throw new Meteor.Error('Quantidade de produtos passou do limite');
    else
      return 1 
}

export const eLimiteDePreco = (preco) => {
  if(preco>10)
    throw new Meteor.Error('Produto com preço além do limite');
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

    if(eLimiteDeProduto(quantidade))

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
  },

  'valorTotalLista'() {
    if (!this.userId) { throw new Meteor.Error('Acesso não permitido.'); }
    const produtos = ProdutosCollection.find({ userId: this.userId }).fetch();
    
    let valorTotal = 0;
    produtos.forEach((produto) => {
      valorTotal = valorTotal + produto.quantidade * produto.valor;
    })
    
    return valorTotal;
  },

  'produtoMaisCaro'() {
    if (!this.userId) { throw new Meteor.Error('Acesso não permitido.'); }
    const produtos = ProdutosCollection.find({ userId: this.userId }).fetch();
    
    let valor = 0;
    let nome = '';
    produtos.forEach((produto) => {
      if(produto.valor > valor){
        valor = produto.valor;
        nome = produto.nome;
      }
    })
    
    return {valor, nome};
  },

  'produtoMaisBarato'() {
    if (!this.userId) { throw new Meteor.Error('Acesso não permitido.'); }
    const produtos = ProdutosCollection.find({ userId: this.userId }).fetch();
    
    let valor = 10000000;
    let nome = '';
    produtos.forEach((produto) => {
      if(produto.valor < valor){
        valor = produto.valor;
        nome = produto.nome;
      }
    })
    
    return {valor, nome};
  }
});