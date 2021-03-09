# Empregabilidade

## Pré-condição
- Ter o Node.JS instalado na máquina, versão 10 ou 12 e acima disso.

## Antes de executar os testes

### Executar o npm init
1. Crie uma pasta
2. Abra o prompt de comando e abrir a pasta criada
3. Utilize o comando **npm init**

### Instalar o Cypress
1. Utilize o comando **npm install cypress --save-dev**

### Configurar o arquivo package.json
1. Após instalar o Cypress, abra o arquivo package.json
2. Dentro da chave *scripts*, adicione a chave/valor abaixo
```
"cypress:open": "cypress open"
```

### Execute o comando para rodar o Cypress
1. No terminal, execute o comando para rodar o cypress: **npm run cypress:open**
> Com isso será add a pasta cypress no diretório

#### Adicionar as pastas de testes em integration
1. Abra a pasta cypress > integration e apague todos os arquivos
2. Adicione as pastas de testes da pasta integration que foram disponibilizadas

### Adicionar os arquivos de dados em fixtures
1. Abra a pasta cypress > fixtures e apague todos os arquivos
2. Adicione as pastas de testes da pasta fixtures que foram disponibilizadas

### Configurar variável de ambiente
1. Abra o arquivo cypress.json
2. Adicione os trechos entre as chaves:

>Lembrando que a url que deve estar no cypress.json é a url em que o projeto está sendo executado no momento
> Não modifique o nome das chaves pois elas são utilizadas no código de 

```
"env": {
        "url_empresa": "url_da_aplicação"
        "url_nucleo": "url_da_aplicação"
    },

"defaultCommandTimeout": 30000
```