# Teste prático

### Ferramentas usadas desenvolver e rodar a aplicação
- Back-end
  - Node.js || v14.17.5 - https://nodejs.org/en/
  - MySQL e Workbench || 8.0.26 - https://dev.mysql.com/downloads/installer/
  - Nodemon || Para instalar rapidamente digite no terminal: __"npm install nodemon"__ 
- Front-end
  - Bootstrap 5 (cdnjs)
  - JQuery (cdnjs)
  - twbs-pagination (cdnjs)

### Como compilar o projeto
1. Rode o script_tabela.sql no banco de dados MySQL para criar a tabela __ponto_turistico___; 
2. Acesse a pasta do projeto e adentre na pasta da api, feito isso execute o seguinte comando no terminal para instalar as dependências do projeto: __npm install__; 
3. Dentro da pasta existe um arquivo com o nome "nodemon.json" onde contém as informações que são usadas para se conectar ao banco de dados, mude-o de acordo com o seu login, senha e outras informações (se necessário).
4. Após a instalação e configurar o arquivo de conexão, rode o seguinte comando no terminal ainda dentro da pasta da API para iniciar o serviço: __npm start__
5. Com a API rodando abra o arquivo index.html no navegador (conexão com internet é necessário pela dependência de alguns plugins que são carregados pelo cdnjs);
6. Pronto! Agora é só usar a vontade.



