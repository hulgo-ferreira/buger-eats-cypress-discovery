import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'

describe('Cadastro', () => {

    //obtendo a massa de teste que está no arquivo deliver.json em fixture
   /*beforeEach(function() {
        cy.fixture('deliver').then((d)=> {
            this.deliver = d      //this é uma palavra reservado para eu criar um variável de contexto deliver
        })                        //uso this para eu ter acesso a essa informação nos outros casos de testes
    }); */

    it('Usuário deve se tornar um entregador', function() { //caso de teste

        var deliver = signupFactory.deliver()

        signup.go()
        signup.fillForm(deliver)
        signup.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)
    })

    it('CPF incorreto', function() {

        var deliver = signupFactory.deliver()

        deliver.cpf = '00000014141AA'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')  
        // aqui eu não precisei criar uma constante pq a sms é curtinha
    })

    it('Email incorreto', function() {

        var deliver = signupFactory.deliver()

        deliver.email = 'hulgo.com.br'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')  
        // aqui eu não precisei criar uma constante pq a sms é curtinha
    })

    context('Campos obrigatórios', function() {
        
        //definindo a massa de teste esperada
        const messages = [    //constante do tipo array p/ validação dos campos obrigatórios
            { field: 'name', output: 'É necessário informar o nome' },   //output mensagem esperada
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }

        ]  
        //before (função de gancho) para executar uma única vez
        before(function() {
            signup.go()     //contexto do meu cenário
            signup.submit() //contexto do meu cenário
        })

        //array utilizo forEach que irá percorrer pela minha lista de mensagens através de um loop
        messages.forEach(function(msg){   //msg no singular meu argumento
            it(`${msg.field} is required`, function() {
                signup.alertMessageShouldBe(msg.output)
            })
        })

    })

})
