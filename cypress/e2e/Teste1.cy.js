describe('Teste End-to-End', () => {
  it('Logar no sistema', () => {
    cy.visit('http://localhost:3000/')

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
  

})