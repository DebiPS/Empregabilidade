/// <reference types="cypress"/>

describe('Faltando campos obrigatórios', () => {
    before('Acessar site', () => {
        cy.visit(Cypress.env('url_nucleo'))
        cy.viewport(1280, 720)

        cy.contains('Núcleo de Estágio').click()

        //Verificando se está na caixa certa para acessar como núcleo de estágio
        cy.get('.access-form--header > .title-form').should('have.text', 'Acesso Núcleo de Estágio')

        cy.fixture('login/login_nucleo.json').as('nucleo').then(function() {
            cy.get('[ng-model="perfil.login"]').type(this.nucleo.user)
            cy.get('[ng-model="perfil.senha"]').type(this.nucleo.senha)
            cy.get('[type="submit"]').contains('Entrar').click()
        })

    })

    beforeEach('Abrindo modal de cadastro de empresa', () => {     
        //Redimensionando janela
        cy.viewport(1280, 720)

        //Acessando página de cadastro de vagas   
        cy.get('.sidebar-links > :nth-child(3)').click()
        cy.get('[ui-sref="nucleo.cadastro-vaga"]').click()

        //Acessando modal
        cy.get('[ng-click="openModalAddEmpresaAux()"]').click()

        //Verificando se acessou a modal
        cy.get('#addEmpresaAux  .modal-header').contains('Adicionar Empresa')
    })

    afterEach('Fechando modal de cadastro de empresa', () => {
        cy.get('#addEmpresaAux .close').click()

        //Verificando se fechou a modal
        cy.get('.titulo-sessao').should('have.text', 'Cadastrar vaga')

    })
    
    describe('Cadastrar empresa auxiliar sem algum campo obrigatório', () => {        
        it('Sem razão social', () => {
            cy.fixture('cadastro/empresaDados.json').as('dados').then(function() {
                cy.get('#addEmpresaAux [name="razaoSocial"]').clear()
                cy.get('#addEmpresaAux [name="nomeFantasia"]').clear().type(this.dados.fantasia)
                cy.get('#addEmpresaAux [name="cnpj"]').clear().type(this.dados.cnpj)
                cy.get('#addEmpresaAux [name="email"]').clear().type(this.dados.email)
                
            })

            //ASSERTIVA
            cy.get('#addEmpresaAux [ng-click="addEmpresaAux(vaga.empAux)"]').click()
            cy.get('[ng-bind-html="message"]').should('have.text', 'Campo Razão Social é obrigatório')
        
        })
    
        it('Sem nome fantasia', () => {
            cy.fixture('cadastro/empresaDados.json').as('dados').then(function() {
                cy.get('#addEmpresaAux [name="razaoSocial"]').clear().type(this.dados.razao)
                cy.get('#addEmpresaAux [name="nomeFantasia"]').clear()
                cy.get('#addEmpresaAux [name="cnpj"]').clear().type(this.dados.cnpj)
                cy.get('#addEmpresaAux [name="email"]').clear().type(this.dados.email)
                
            })

            //ASSERTIVA
            cy.get('#addEmpresaAux [ng-click="addEmpresaAux(vaga.empAux)"]').click()
            cy.get('[ng-bind-html="message"]').should('have.text', 'Campo Nome fantasia é obrigatório')
        
        })

        it('Sem CNPJ', () => {
            cy.fixture('cadastro/empresaDados.json').as('dados').then(function() {
                cy.get('#addEmpresaAux [name="razaoSocial"]').clear().type(this.dados.razao)
                cy.get('#addEmpresaAux [name="nomeFantasia"]').clear().type(this.dados.fantasia)
                cy.get('#addEmpresaAux [name="cnpj"]').clear()
                cy.get('#addEmpresaAux [name="email"]').clear().type(this.dados.email)
                
            })

            //ASSERTIVA
            cy.get('#addEmpresaAux [ng-click="addEmpresaAux(vaga.empAux)"]').click()
            cy.get('[ng-bind-html="message"]').should('have.text', 'Campo CNPJ é obrigatório')
        
        })

        it('Sem E-mail', () => {
            cy.fixture('cadastro/empresaDados.json').as('dados').then(function() {
                cy.get('#addEmpresaAux [name="razaoSocial"]').clear().type(this.dados.razao)
                cy.get('#addEmpresaAux [name="nomeFantasia"]').clear().type(this.dados.fantasia)
                cy.get('#addEmpresaAux [name="cnpj"]').clear().type(this.dados.cnpj)
                cy.get('#addEmpresaAux [name="email"]').clear()
                
            })

            //ASSERTIVA
            cy.get('#addEmpresaAux [ng-click="addEmpresaAux(vaga.empAux)"]').click()
            cy.get('[ng-bind-html="message"]').should('have.text', 'Campo EMAIL é obrigatório')
        
        })

    })
    
})