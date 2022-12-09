describe('Teste End-to-End', () => {
  it('Logar no sistema', () => {
    cy.visit('http://localhost:3000/', { headers: { "Accept-Encoding": "gzip, deflate" } })

    cy.get('[data-id=user-input]').within(() => {
      cy.get('input').type('admin')
    })

    cy.get('[data-id=password-input]').within(() => {
      cy.get('input').type('admin')
    })

    cy.get('[data-id=login-button]').within(() => {
      cy.contains('Entrar').click().then
      cy.wait(2000)
    })

    cy.get('[data-id=home-page]').should('contain.text', 'admin')
   
  })


  it('Inserir produto', () => {
    cy.visit('http://localhost:3000/')


    // Logar no sistema
    cy.get('[data-id=user-input]').within(() => {
      cy.get('input').type('admin')
    })

    cy.get('[data-id=password-input]').within(() => {
      cy.get('input').type('admin')
    })

    cy.get('[data-id=login-button]').within(() => {
      cy.contains('Entrar').click().then
      cy.wait(2000)
    })


    //Teste de inserir produto
    cy.get('[data-id=produto]').within(() => {
      cy.get('input').type('Banana')
    })

    cy.get('[data-id=quantidade]').within(() => {
      cy.get('input').type('2')
    })

    cy.get('[data-id=preco]').within(() => {
      cy.get('input').type('3.5')
    })

    cy.get('[data-id= button-add]').within(() => {
      cy.contains('Adicionar').click().then
    })


    cy.get('[data-id=valor-total]').should('contain.text', 'R$ 7')
       
  })


  it('Remover produto', () => {
    cy.visit('http://localhost:3000/')


    // Logar no sistema
    cy.get('[data-id=user-input]').within(() => {
      cy.get('input').type('admin')
    })

    cy.get('[data-id=password-input]').within(() => {
      cy.get('input').type('admin')
    })

    cy.get('[data-id=login-button]').within(() => {
      cy.contains('Entrar').click().then
      cy.wait(2000)
    })


    //Teste de remover produto
    cy.get('[data-id=remove-produto]').click().then
    cy.get('[data-id=valor-total]').should('contain.text', 'R$ 0')
  })



  it('Produto mais caro', () => {
    cy.visit('http://localhost:3000/')


    // Logar no sistema
    cy.get('[data-id=user-input]').within(() => {
      cy.get('input').type('admin')
    })

    cy.get('[data-id=password-input]').within(() => {
      cy.get('input').type('admin')
    })

    cy.get('[data-id=login-button]').within(() => {
      cy.contains('Entrar').click().then
      cy.wait(2000)
    })


    //Adiciona produto 1
    cy.get('[data-id=produto]').within(() => {
      cy.get('input').type('Produto 1')
    })

    cy.get('[data-id=quantidade]').within(() => {
      cy.get('input').type('2')
    })

    cy.get('[data-id=preco]').within(() => {
      cy.get('input').type('2.0')
    })

    cy.get('[data-id= button-add]').within(() => {
      cy.contains('Adicionar').click().then
    })

    //Adiciona produto 2
    cy.get('[data-id=produto]').within(() => {
      cy.get('input').type('Produto 2')
    })

    cy.get('[data-id=quantidade]').within(() => {
      cy.get('input').type('2')
    })

    cy.get('[data-id=preco]').within(() => {
      cy.get('input').type('10.50')
    })

    cy.get('[data-id= button-add]').within(() => {
      cy.contains('Adicionar').click().then
    })


    //Teste produto mais caro
    cy.get('[data-id=mais-caro]').should('contain.text', 'R$ 10.5')

    cy.get('[data-id=remove-produto]').click({multiple: true, force: true}).then
    cy.get('[data-id=remove-produto]').click().then
    cy.get('[data-id=valor-total]').should('contain.text', 'R$ 0')
    
    
       
  })


  it('Produto mais barato', () => {
    cy.visit('http://localhost:3000/')


    // Logar no sistema
    cy.get('[data-id=user-input]').within(() => {
      cy.get('input').type('admin')
    })

    cy.get('[data-id=password-input]').within(() => {
      cy.get('input').type('admin')
    })

    cy.get('[data-id=login-button]').within(() => {
      cy.contains('Entrar').click().then
      cy.wait(2000)
    })


    //Adiciona produto 1
    cy.get('[data-id=produto]').within(() => {
      cy.get('input').type('Produto 1')
    })

    cy.get('[data-id=quantidade]').within(() => {
      cy.get('input').type('2')
    })

    cy.get('[data-id=preco]').within(() => {
      cy.get('input').type('2.0')
    })

    cy.get('[data-id= button-add]').within(() => {
      cy.contains('Adicionar').click().then
    })

    //Adiciona produto 2
    cy.get('[data-id=produto]').within(() => {
      cy.get('input').type('Produto 2')
    })

    cy.get('[data-id=quantidade]').within(() => {
      cy.get('input').type('2')
    })

    cy.get('[data-id=preco]').within(() => {
      cy.get('input').type('10.50')
    })

    cy.get('[data-id= button-add]').within(() => {
      cy.contains('Adicionar').click().then
    })


    //Teste produto mais barato
    cy.get('[data-id=mais-barato]').should('contain.text', 'R$ 2')

    //Remover produtos
    cy.get('[data-id=remove-produto]').click({multiple: true, force: true}).then
    cy.get('[data-id=remove-produto]').click().then
    cy.get('[data-id=valor-total]').should('contain.text', 'R$ 0')
    
    
       
  })
  



  it('Quantidade de produtos', () => {
    cy.visit('http://localhost:3000/')


    // Logar no sistema
    cy.get('[data-id=user-input]').within(() => {
      cy.get('input').type('admin')
    })

    cy.get('[data-id=password-input]').within(() => {
      cy.get('input').type('admin')
    })

    cy.get('[data-id=login-button]').within(() => {
      cy.contains('Entrar').click().then
      cy.wait(2000)
    })


    //Adiciona produto 1
    cy.get('[data-id=produto]').within(() => {
      cy.get('input').type('Produto 1')
    })

    cy.get('[data-id=quantidade]').within(() => {
      cy.get('input').type('2')
    })

    cy.get('[data-id=preco]').within(() => {
      cy.get('input').type('2.0')
    })

    cy.get('[data-id= button-add]').within(() => {
      cy.contains('Adicionar').click().then
    })

    //Adiciona produto 2
    cy.get('[data-id=produto]').within(() => {
      cy.get('input').type('Produto 2')
    })

    cy.get('[data-id=quantidade]').within(() => {
      cy.get('input').type('2')
    })

    cy.get('[data-id=preco]').within(() => {
      cy.get('input').type('10.50')
    })

    cy.get('[data-id= button-add]').within(() => {
      cy.contains('Adicionar').click().then
    })

    //Adiciona produto 3
    cy.get('[data-id=produto]').within(() => {
      cy.get('input').type('Produto 3')
    })

    cy.get('[data-id=quantidade]').within(() => {
      cy.get('input').type('1')
    })

    cy.get('[data-id=preco]').within(() => {
      cy.get('input').type('1.5')
    })

    cy.get('[data-id= button-add]').within(() => {
      cy.contains('Adicionar').click().then
    })
  
       //Adiciona produto 4
       cy.get('[data-id=produto]').within(() => {
        cy.get('input').type('Produto 4')
      })
  
      cy.get('[data-id=quantidade]').within(() => {
        cy.get('input').type('1')
      })
  
      cy.get('[data-id=preco]').within(() => {
        cy.get('input').type('2')
      })
  
      cy.get('[data-id= button-add]').within(() => {
        cy.contains('Adicionar').click().then
      })
  


    //Teste quantidade de produtos
    cy.get('[data-id=qnt-produto]').should('contain.text', '4')

    //Remover produtos
    cy.get('[data-id=remove-produto]').click({multiple: true, force: true}).then
    cy.get('[data-id=remove-produto]').click().then
    cy.get('[data-id=valor-total]').should('contain.text', 'R$ 0')
    
       
  })
  

})
