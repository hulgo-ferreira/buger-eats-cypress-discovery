

class SignupPage { //padrão PascalCase

    go() { //criando função p/ acessar a página
        cy.visit('/'); //config. no arquivo cypress.json

        cy.get('a[href="/deliver"]').click()
        //validando que estou indo pro caminho certo (checkpoint)
        cy.get('#page-deliver form h1').should('have.text','Cadastre-se para  fazer entregas')
    }

    fillForm(deliver) {
        cy.get('input[name="fullName"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)

        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type=button][value="Buscar CEP"]').click()
        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)

        //validando através dos campos rua, bairro e cidade pra ver se estou na página certa
        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)

        //realizando a busca de um elemento li utilizando contains
        cy.contains('.delivery-method li', deliver.delivery_method).click()

        //upload de imagem e concatenando a pasta images para o cypress encontrar a imagem
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh)
    }

    submit() {  //click do button
        cy.get('form button[type="submit"]').click()
    }
    
    modalContentShouldBe(expectedMessage) { //validação 
        cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage)

        //uma vez que eu defini o nome da imagem no objeto, ele vai procurar automaticamente esse arquivo dentro da pasta fixtures
    }

    alertMessageShouldBe(expectedMessage) {
        //validando a mensagem de alerta do CPF inválido
        //cy.get('.alert-error').should('have.text', expectedMessage)
        
        //combinando texto com classe buscando um único elemento
        //aqui ele busca o elemento combinado com o texto e verifica se está visível
        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }

}

export default new SignupPage; 
//exportar já instanciado
//exportando essa página para que eu possa importá-la na camada de teste