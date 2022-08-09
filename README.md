# Template Serverless

### Submódulos
Este repositório possui submódulos.

Então após a clonagem rode os comandos:
* git submodule init
* git submodule update

## Instalação do DOCKER
1. Instale o [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/) e [Docker Compose](https://docs.docker.com/compose/install/)
2. Caso não tenha o repositório do [Altu-serverless](https://github.com/Altu1/altu-serverless), clone ele com o comando 
```
git clone https://github.com/Altu1/altu-serverless.git
```
4. Rode o comando `npm install` dentro da pasta do projeto
4. Desative o MySQL do seu sistema: `sudo service mysql stop`. Para ver se realmente parou o serviço: `sudo service mysql status`. Verifique que o campo `Active: inactive` esteja presente.
5. Navegue até a pasta do `altu-serverless` e execute o comando `make up` (pode demorar um pouco pois vai ser a primeira vez que iremos rodar o comando).
6. Abra uma nova aba no terminal e execute o comando `make sh`
7. Rode o comando `npm install` dentro do container
8. A partir daí, estamos dentro do `container` e pode começar o desenvolvimento das apis. (Rodar os comandos para testar off-line, etc...).
9. Criar o arquivo `credentials` na pasta `config/aws` do projeto e colocar as credenciais como abaixo:
```
[altu-serverless]
aws_access_key_id = xxx
aws_secret_access_key = yyy
```
**OBS**: Os valores de `xxx` e `yyy` devem ser solicitados a equipe.

10. [OPCIONAL] Caso a senha do seu banco de dados esteja diferente pode ser que seja necessário ajustar dois arquivos:

`docker-compose.yml`
```
database:
      environment:
        - MYSQL_ROOT_PASSWORD=SUA_SENHA
```
`config/env.local.yml`
```
dbPassword: SUA_SENHA
```

## Como usar o Docker
1. Pare o serviço do Mysql: `sudo service mysql stop`
2. Execute o comando `make up`
3. Execute o comando em outra aba do terminal: `make sh`. Nessa aba, pode seguir usando os comandos para testes locais.
4. Para sair do container, na aba que executou `make sh`, escreva: `exit` e na aba que executou `make up`, CTRL+C para ele ir desligando os serviços (caso não funcione, use o comando `make stop`).

## Estrutura de pastas

* **common**: Contém libs que podem ser usadas por qualquer serviço.
* **common/database/***: ORM para o banco de dados.
* **config**: YAMLs com variáveis de ambiente para cada stage.
* **node_modules**: Libs declaradas no `package.json`, instaladas pelo comando `npm install`.
* **services**: Pasta onde ficam os serviços. Cada serviço tem sua configuração e suas funções (lambda). O deploy é individual para cada serviço.
* **package.json**: Declaração do projeto e das dependências de bibliotecas externas.
* **serverless.yml**: Configurações gerais, compartilhadas por todos os serviços.

## Como rodar um serviço no ambiente local

Na pasta do projeto, execute o comando:

```
sls offline start -s local --config-file services/<servico>/config.yml
```

Caso prefira, npm ja roda o projeto localmente
```

## Como criar um nova serviço

Duplique a pasta `services/example` e renomeie de acordo com a necessidade.

## Separar ambientes com o mesmo handler

Duplique a pasta `services/example_env` e renomeie de acordo com a necessidade.

Neste config temos de diferente a linha:
```
18: basePath: 'example-${self:provider.stage}'
```

Assim ao se fazer o deploy/remove com os métodos acima ele criará um versão da API no Lambda com o <stage> utilizado.

E também criará URLs diferentes para cada <stage>, como as abaixo:
```
https://api.example.com.br/example-dev/helloWorld
e
https://api.example.com.br/example-prod/helloWorld
```

É importante lembrar aqui que ambos usam o mesmo handler, então o handler atual entrará no ar no momento do deploy.

Para ter acesso ao ambiente dentro dos módulos, acesse a variável global 'ENV', já definida no arquivo handler.js:
```
const ENV = process.env.stage;
```

## PRE COMMIT

Para evitar subir erros devemos instalar o "eslint" alinhado ao "pre-commit"

Para instalar o eslint basta seguir o guia abaixo:
```
https://eslint.org/docs/user-guide/command-line-interface
```

E adicionar o `eslint-plugin-json`: 
```
sudo npm i -g eslint-plugin-json
```

Na raiz do repositório existe um novo arquivo, chamado "eslint.conf" com o conteúdo:
```
{
    "parserOptions": {
        "ecmaVersion": 2017
    },

    "env": {
        "es6": true
    },
    
    "plugins": [
        "json"
    ]
}

```
Este arquivo indica a configuração a ser usada pelo eslint.

Como a pasta de hooks não é enviada ao git, deve fazer a configuração do arquivo de pre-commit.

Copiar o arquivo:
```
eslint/pre-commit
```
Para:
```
.git/hooks/pre-commit
```
E dar permissão de execução ao mesmo.

Com isto feito caso o arquivo tenha um erro você terá um recado como abaixo indicando o erro:
```
path_to_file/handler.js
  81:21  error  Parsing error: Unexpected token status_code

✖ 1 problem (1 error, 0 warnings)
```
E seu commit será desfeito.

