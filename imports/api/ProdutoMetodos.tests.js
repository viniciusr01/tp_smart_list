import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { ProdutosCollection } from './db/ProdutosCollection';
import { mockMethodCall } from 'meteor/quave:testing';
import { assert, expect } from 'chai';
import '/imports/api/ProdutoMetodos';

import {eLimiteDeProduto, eLimiteDePreco, eValorMonetario} from './ProdutoMetodos';

if (Meteor.isServer) {
  describe('Produtos', () => {
    describe('Produto Métodos', () => {
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

      


    });
  });

  

  describe('Teste Criar Produto', () => {

    const userId = Random.id();

    it('consegue inserir novo produto', () => {
      const nome = 'Produto novo';
      const quantidade = '5';
      const preco = '1.50';
      mockMethodCall('produto.inserir', nome, quantidade, preco, {
        context: { userId },
      });

      const produtos = ProdutosCollection.find({}).fetch();
      assert.equal(produtos.length, 2);
      assert.isTrue(produtos.some(produto => produto.nome === nome));
    });


    it('Valor de preço são letras', () => {
      const nome = 'Produto novo';
      const quantidade = '5';
      const preco = 'asdasdasd';


      const erro = () => mockMethodCall('produto.inserir', nome, quantidade, preco, {
        context: { userId },
      });

      assert.throws( erro, /O preço inserido não é um numero./);
    });


    it('Valor de preço são caracteres especiais', () => {
      const nome = 'Produto novo';
      const quantidade = '5';
      const preco = '@!#';


      const erro = () => mockMethodCall('produto.inserir', nome, quantidade, preco, {
        context: { userId },
      });

      assert.throws( erro, /O preço inserido não é um numero./);
    });


    it('Valor de preço são numeros + letras', () => {
      const nome = 'Produto novo';
      const quantidade = '5';
      const preco = '15va';


      const erro = () => mockMethodCall('produto.inserir', nome, quantidade, preco, {
        context: { userId },
      });

      assert.throws( erro, /O preço inserido não é um numero./);
    });

    it('Valor de preço são letras + numeros', () => {
      const nome = 'Produto novo';
      const quantidade = '1';
      const preco = 'va15';


      const erro = () => mockMethodCall('produto.inserir', nome, quantidade, preco, {
        context: { userId },
      });

      assert.throws( erro, /O preço inserido não é um numero./);
    });


    it('Valor de preço são numeros + caracteres especiais', () => {
      const nome = 'Produto novo';
      const quantidade = '1';
      const preco = '2#';


      const erro = () => mockMethodCall('produto.inserir', nome, quantidade, preco, {
        context: { userId },
      });

      assert.throws( erro, /O preço inserido não é um numero./);
    });


    it('Valor de preço são caracteres especiais + numeros ', () => {
      const nome = 'Produto novo';
      const quantidade = '1';
      const preco = '#2';


      const erro = () => mockMethodCall('produto.inserir', nome, quantidade, preco, {
        context: { userId },
      });

      assert.throws( erro, /O preço inserido não é um numero./);
    });



  });




  describe('Teste de limite da quantidade do produto', () => {

    it('Limite inferior', () => {
      assert.equal(eLimiteDeProduto(9), 1);
    });

    it('Limite', () => {
      assert.equal(eLimiteDeProduto(10), 1);
    });

    it('Limite Superior', () => {
        assert.throws( () => eLimiteDeProduto(11), /Quantidade de produtos passou do limite./);
    });

  });




  describe('Teste de limite de Preco', () => {

    it('Limite inferior - Preço', () => {
      assert.equal(eLimiteDePreco(34), 1);
    });

    it('Limite - Preço', () => {
      assert.equal(eLimiteDePreco(35.99), 1);
    });

    it('Limite Superior - Preço', () => {
        assert.throws( () => eLimiteDePreco(36), /Produto com preço além do limite./);
    });

  });


  describe('Teste de função valor monetário', () => {

    it('Teste valor com virgula', () => {
      assert.equal(eValorMonetario('15,50'), true);
    });

    it('Teste valor com ponto', () => {
      assert.equal(eValorMonetario('1.50'), true);
    });

    it('Teste valor com letra e ponto', () => {
      assert.equal(eValorMonetario('1.50a'), false);
    });

    it('Teste valor com letra e virgula', () => {
      assert.equal(eValorMonetario('1,50a'), false);
    });

    it('Teste valor com caracter especial e virgula', () => {
      assert.equal(eValorMonetario('1,50##$?'), false);
    });

    it('Teste valor com letra e ponto', () => {
      assert.equal(eValorMonetario('1.50@@$&'), false);
    });

    it('Teste valor com letra apenas', () => {
      assert.equal(eValorMonetario('a'), false);
    });

    it('Teste valor com letras apenas', () => {
      assert.equal(eValorMonetario('afsdfsfsd'),false);
    });

    it('Teste valor com caracter especial', () => {
      assert.equal(eValorMonetario('#'), false);
    });


    it('Teste valor com caracteres especiais', () => {
      assert.equal(eValorMonetario('#@#?'), false);
    });

  });


}