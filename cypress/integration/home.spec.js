

describe('home page', () => {  //função javascript
    it('app deve estar online', () => {
        cy.visit('/');
        //validando se existe um texto na tag h1
    //esquema de busca: bisavô, avô, pai e filho #page-home main h1
        cy.get('#page-home main h1').should('have.text','Seja um parceiro entregador pela Buger Eats') 
    });
});

