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

      it(`não consegue deletar um produto que não existe`, () => {
        const fn = () =>
          mockMethodCall('produto.remover', 'idInexistente', {
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

      ProdutosCollection.remove({});
      mockMethodCall('produto.inserir', nome, quantidade, preco, {
        context: { userId },
      });

      const produtos = ProdutosCollection.find({}).fetch();
      assert.equal(produtos.length, 1);
      assert.isTrue(produtos.some(produto => produto.nome === nome));
    });

    it('Pode inserir nome com caracteres especiais', () => {
      const nome = '#$%';
      const quantidade = '3';
      const preco = '3';

      ProdutosCollection.remove({});
      mockMethodCall('produto.inserir', nome, quantidade, preco, {
        context: { userId },
      });

      const produtos = ProdutosCollection.find({}).fetch();
      assert.equal(produtos.length, 1);
      assert.isTrue(produtos.some(produto => produto.nome === nome));
    });

    it('Pode inserir nome com espaços', () => {
      const nome = 'Produto qualquer';
      const quantidade = '3';
      const preco = '3';

      ProdutosCollection.remove({});
      mockMethodCall('produto.inserir', nome, quantidade, preco, {
        context: { userId },
      });

      const produtos = ProdutosCollection.find({}).fetch();
      assert.equal(produtos.length, 1);
      assert.isTrue(produtos.some(produto => produto.nome === nome));
    });

    it('Pode inserir nome números', () => {
      const nome = 'Pizza 4 queijos';
      const quantidade = '3';
      const preco = '3';

      ProdutosCollection.remove({});
      mockMethodCall('produto.inserir', nome, quantidade, preco, {
        context: { userId },
      });

      const produtos = ProdutosCollection.find({}).fetch();
      assert.equal(produtos.length, 1);
      assert.isTrue(produtos.some(produto => produto.nome === nome));
    });

    it('Quantidade são letras', () => {
      const nome = 'Produto novo';
      const quantidade = 'abcd';
      const preco = '3';


      const erro = () => mockMethodCall('produto.inserir', nome, quantidade, preco, {
        context: { userId },
      });

      assert.throws( erro, /A quantidade inserida não é um numero/);
    });

    it('Quantidade são letras e numeros', () => {
      const nome = 'Produto novo';
      const quantidade = 'abcd123';
      const preco = '3';


      const erro = () => mockMethodCall('produto.inserir', nome, quantidade, preco, {
        context: { userId },
      });

      assert.throws( erro, /A quantidade inserida não é um numero/);
    });

    it('Quantidade são letras e espaços', () => {
      const nome = 'Produto novo';
      const quantidade = 'ab cd';
      const preco = '3';


      const erro = () => mockMethodCall('produto.inserir', nome, quantidade, preco, {
        context: { userId },
      });

      assert.throws( erro, /A quantidade inserida não é um numero/);
    });

    it('Quantidade são caracteres especiais', () => {
      const nome = 'Produto novo';
      const quantidade = '#$%';
      const preco = '3';


      const erro = () => mockMethodCall('produto.inserir', nome, quantidade, preco, {
        context: { userId },
      });

      assert.throws( erro, /A quantidade inserida não é um numero/);
    });

    it('Quantidade são caracteres especiais e numeros', () => {
      const nome = 'Produto novo';
      const quantidade = '$#@123';
      const preco = '3';


      const erro = () => mockMethodCall('produto.inserir', nome, quantidade, preco, {
        context: { userId },
      });

      assert.throws( erro, /A quantidade inserida não é um numero/);
    });

    it('Quantidade são caracteres especiais e letras', () => {
      const nome = 'Produto novo';
      const quantidade = '$#@abc';
      const preco = '3';


      const erro = () => mockMethodCall('produto.inserir', nome, quantidade, preco, {
        context: { userId },
      });

      assert.throws( erro, /A quantidade inserida não é um numero/);
    });

    it('Quantidade são caracteres especiais, letras e numeros', () => {
      const nome = 'Produto novo';
      const quantidade = '$#@abc123';
      const preco = '3';


      const erro = () => mockMethodCall('produto.inserir', nome, quantidade, preco, {
        context: { userId },
      });

      assert.throws( erro, /A quantidade inserida não é um numero/);
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

    it('Valor de preço são caracteres e espaço', () => {
      const nome = 'Produto novo';
      const quantidade = '1';
      const preco = '# %';


      const erro = () => mockMethodCall('produto.inserir', nome, quantidade, preco, {
        context: { userId },
      });

      assert.throws( erro, /O preço inserido não é um numero./);
    });

    it('Valor de preço são letras e espaço', () => {
      const nome = 'Produto novo';
      const quantidade = '1';
      const preco = 'a b';


      const erro = () => mockMethodCall('produto.inserir', nome, quantidade, preco, {
        context: { userId },
      });

      assert.throws( erro, /O preço inserido não é um numero./);
    });

    it('Valor de preço são letras, espaço e numero', () => {
      const nome = 'Produto novo';
      const quantidade = '1';
      const preco = 'a b1';


      const erro = () => mockMethodCall('produto.inserir', nome, quantidade, preco, {
        context: { userId },
      });

      assert.throws( erro, /O preço inserido não é um numero./);
    });

    it('Valor de preço são caracteres, espaço e numero', () => {
      const nome = 'Produto novo';
      const quantidade = '1';
      const preco = '$ #1';


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

    it('Teste valor com caracteres especiais e espaço', () => {
      assert.equal(eValorMonetario('# @#?'), false);
    });

    it('Teste valor com letras e espaço', () => {
      assert.equal(eValorMonetario('a b c'), false);
    });

  });

  describe('Métodos de calcular valores', () => {
    const userId = Random.id();

    it('calcula produto mais caro', () => {
      ProdutosCollection.insert({
        nome: 'Produto teste',
        quantidade:'3',
        valor: '3',
        createdAt: new Date(),
        userId,
      });

      ProdutosCollection.insert({
        nome: 'Produto teste',
        quantidade:'1',
        valor: '1',
        createdAt: new Date(),
        userId,
      });

      const retorno = mockMethodCall('produtoMaisCaro', {
        context: { userId },
      });

      assert.equal( retorno.valor, 3);
      ProdutosCollection.remove({});
    });

    it('calcula produto mais caro de apenas 1 item', () => {
      ProdutosCollection.insert({
        nome: 'Produto teste',
        quantidade:'1',
        valor: '1',
        createdAt: new Date(),
        userId,
      });

      const retorno = mockMethodCall('produtoMaisCaro', {
        context: { userId },
      });

      assert.equal( retorno.valor, 1);
      ProdutosCollection.remove({});
    });

    it('calcula produto mais barato', () => {
      ProdutosCollection.insert({
        nome: 'Produto teste',
        quantidade:'3',
        valor: '3',
        createdAt: new Date(),
        userId,
      });

      ProdutosCollection.insert({
        nome: 'Produto teste',
        quantidade:'1',
        valor: '1',
        createdAt: new Date(),
        userId,
      });

      const retorno = mockMethodCall('produtoMaisBarato', {
        context: { userId },
      });

      assert.equal( retorno.valor, 1);
    });

    it('calcula produto mais barato de apenas 1 item', () => {
      ProdutosCollection.insert({
        nome: 'Produto teste',
        quantidade:'1',
        valor: '1',
        createdAt: new Date(),
        userId,
      });

      const retorno = mockMethodCall('produtoMaisBarato', {
        context: { userId },
      });

      assert.equal( retorno.valor, 1);
    });

    it('calcula valor total', () => {
      ProdutosCollection.remove({});
      ProdutosCollection.insert({
        nome: 'Produto teste',
        quantidade:'3',
        valor: '3',
        createdAt: new Date(),
        userId,
      });

      ProdutosCollection.insert({
        nome: 'Produto teste',
        quantidade:'1',
        valor: '1',
        createdAt: new Date(),
        userId,
      });

      const retorno = mockMethodCall('valorTotalLista', {
        context: { userId },
      });

      assert.equal( retorno, 10);
    });

    it('remove itens e calcula valor total', () => {
      ProdutosCollection.remove({});
      ProdutosCollection.insert({
        nome: 'Produto teste',
        quantidade:'3',
        valor: '3',
        createdAt: new Date(),
        userId,
      });

      ProdutosCollection.insert({
        nome: 'Produto teste',
        quantidade:'1',
        valor: '1',
        createdAt: new Date(),
        userId,
      });

      ProdutosCollection.remove({});

      const retorno = mockMethodCall('valorTotalLista', {
        context: { userId },
      });

      assert.equal( retorno, 0);
    });

    it('calcula valor total de nenhum item', () => {
      ProdutosCollection.remove({});

      const retorno = mockMethodCall('valorTotalLista', {
        context: { userId },
      });

      assert.equal( retorno, 0);
    });
  });

}