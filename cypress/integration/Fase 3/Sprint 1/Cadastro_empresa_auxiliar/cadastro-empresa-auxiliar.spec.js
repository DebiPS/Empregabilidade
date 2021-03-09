/// <reference types="cypress"/>

describe('Cadastrando empresa auxiliar e verificando duplicação', () => {
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

    afterEach('Verificando se modal fechou', () => {
        cy.get('.titulo-sessao').should('have.text', 'Cadastrar vaga')
    })

    it('Cadastrando empresa', () => {
        cy.fixture('cadastro/empresaDados.json').as('dados').then(function() {
            cy.get('#addEmpresaAux [name="razaoSocial"]').clear().type(this.dados.razao)
            cy.get('#addEmpresaAux [name="nomeFantasia"]').clear().type(this.dados.fantasia)
            cy.get('#addEmpresaAux [name="cnpj"]').clear().type(this.dados.cnpj)
            cy.get('#addEmpresaAux [name="email"]').clear().type(this.dados.email)
            
        })

        //ASSERTIVA
        cy.get('#addEmpresaAux [ng-click="addEmpresaAux(vaga.empAux)"]').click()
        cy.get('[ng-bind-html="message"]').should('have.text', 'Empresa cadastrada com sucessso!')
    })

    it('Cadastrando mesma empresa', () => {
        cy.fixture('cadastro/empresaDados.json').as('dados').then(function() {
            cy.get('#addEmpresaAux [name="razaoSocial"]').clear().type(this.dados.razao)
            cy.get('#addEmpresaAux [name="nomeFantasia"]').clear().type(this.dados.fantasia)
            cy.get('#addEmpresaAux [name="cnpj"]').clear().type(this.dados.cnpj)
            cy.get('#addEmpresaAux [name="email"]').clear().type(this.dados.email)
            
        })

        //ASSERTIVA
        cy.get('#addEmpresaAux [ng-click="addEmpresaAux(vaga.empAux)"]').click()
        cy.get('[ng-bind-html="message"]').should('have.text', `Já existe uma empresa cadastrada no CNPJ: ${this.dados.cnpj}, com o NOME: ${this.dados.fantasia}`)
    })
        
})