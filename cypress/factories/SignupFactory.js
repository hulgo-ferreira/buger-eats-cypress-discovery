var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {  //criando módulo

    deliver: function() {  //criando função

        var firstName = faker.name.firstName() //primeiro nome
        var lastName = faker.name.lastName() //ultimo nome

        var data = { //massa de dados
            name: `${firstName} ${lastName}`, //apóstrofo ``
            cpf: cpf.generate(),
            email: faker.internet.email(firstName), //aqui irá gerar um email dinâmico através do primeiro nome
            whatsapp: '14997664588',  
            address: { 
             postalcode: '17052670', 
                street: 'Rua Rosevaldo de Abreu Ribeiro', 
                number: '572', 
                details: 'casa',  
                district: 'Jardim Ferraz', 
                city_state: 'Bauru/SP'    
            },
            delivery_method: 'Moto', 
            cnh: 'cnh-digital.jpg'
        }

        return data 
    }
}   

/*
npm i faker@5.5.3

adicionando nova biblioteca para deixar a massa de teste dinâmica
    npm install faker --save-dev 
    npm test

gerador validador de CPF
    npm install gerador-validador-cpf --save-dev 

Para gerar as evidências em vídeo
    npx cypress run

Onde os testes são executados 
    npx cypress run -b chrome
    npx cypress run -b edge
    npx cypress run -b firefox
*/