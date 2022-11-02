import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { ProdutosCollection } from './db/ProdutosCollection';
import { mockMethodCall } from 'meteor/quave:testing';
import { assert } from 'chai';
import '/imports/api/ProdutoMetodos';

if (Meteor.isServer) {
  describe('Produtos', () => {
    describe('methods', () => {
      const userId = Random.id();
      let produtoId;

      beforeEach(() => {
        ProdutosCollection.remove({});
        produtoId = ProdutosCollection.insert({
          nome: 'Produto teste',
          createdAt: new Date(),
          userId,
        });
      });

      it('pode deletar produto cadastrado', () => {
        mockMethodCall('produto.remover', produtoId, { context: { userId } });

        assert.equal(ProdutosCollection.find().count(), 0);
      });

      it(`não consegue deletar um produto sem ter um usuário autenticado`, () => {
        const fn = () => mockMethodCall('produto.remover', produtoId);
        assert.throw(fn, /Você não possui permissão para remover esse produto./);
        assert.equal(ProdutosCollection.find().count(), 1);
      });

      it(`não consegue deletar um produto de outro usuario`, () => {
        const fn = () =>
          mockMethodCall('produto.remover', produtoId, {
            context: { userId: 'id-de-alguem' },
          });
        assert.throw(fn, /O produto não existe./);
        assert.equal(ProdutosCollection.find().count(), 1);
      });

      it('consegue inserir novo produto', () => {
        const nome = 'Produto novo';
        mockMethodCall('produto.inserir', nome, {
          context: { userId },
        });

        const produtos = ProdutosCollection.find({}).fetch();
        assert.equal(produtos.length, 2);
        assert.isTrue(produtos.some(produto => produto.nome === nome));
      });

    });
  });
}