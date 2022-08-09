<div id='top-document'/>


# Fis
This API has the principle of adding and getting the data that is saved inside the mongoDB database

-

Essa API tem como principio adicionar e coletar os dados que são salvos dentro do banco de dados do mongoDB


<br><br>


* [1. GET | getIp](#1)
* [2. POST | postBlacklist](#2)


<br><br><br>




<div id='1' />


## 1. GET | getIp
**Endpoint:** `{{devUrl}}/getIp`

**Método:** GET

**Descrição:** This endpoint returns all data related to the given IP

-

Este endpoint retorna todos os dados relacionados ao IP informado

### Query Params
Param|Obrigatório|Descrição
---|---|---
ip|Sim|


<details>
<summary>Exemplo de uso no Builder</summary>


``` json
 [
  {
    "name": "http_request",
    "parameters": {
      "config": {
        "url": "{{devUrl}}/getIp",
        "method": "GET",
        "params": {
          "ip": "<? $220.110.20.6 ?>"
        }
      },
      "flavor": "axios",
      "before_action_messages": [
        "Mensagem_1",
        "Mensagem_2"
      ]
    },
    "result_variable": "api_GET_getIp"
  }
]
```
</details>



## Exemplos de requisições
<details>
<summary>200 | getIp</summary>



**Status:** undefined - **Code:** undefined


``` 
 {
    "status_code": 200,
    "response": {
        "_id": "6298beba72bdae000982488e",
        "ip": "220.110.20.6",
        "__v": 0,
        "cpf": [
            "12345678903"
        ],
        "errorExcess": false,
        "expireAt": "2022-06-03T00:00:00.000Z"
    },
    "awsFilter": "log aqui"
}
```


</details>



<details>
<summary>401 | getIp</summary>



**Status:** undefined - **Code:** undefined


``` 
 {
    "statusCode": 401,
    "message": "Unauthorized!",
    "awsFilter": "log aqui"
}
```


</details>




[> Voltar ao Topo <](#top-document)

<br><br>




<div id='2' />


## 2. POST | postBlacklist
**Endpoint:** `{{devUrl}}/blacklist`

**Método:** POST

**Descrição:** This endpoint sends all data provided in JSON 

-

Este endpoint envia todos os dados fornecidos no JSON

**Body Params Type:** raw

<details>
<summary>Exemplo de body</summary>


``` json
 {
  "cpf": "12345678903",
  "ip": "220.110.20.6",
  "errorExcess": false
}
```
</details>



<details>
<summary>Exemplo de uso no Builder</summary>


``` json
 [
  {
    "name": "http_request",
    "parameters": {
      "config": {
        "url": "{{devUrl}}/blacklist",
        "method": "POST",
        "data": {
          "cpf": "12345678903",
          "ip": "220.110.20.6",
          "errorExcess": false
        }
      },
      "flavor": "axios",
      "before_action_messages": [
        "Mensagem_1",
        "Mensagem_2"
      ]
    },
    "result_variable": "api_POST_postBlacklist"
  }
]
```
</details>



## Exemplos de requisições
<details>
<summary>200 | postBlacklist</summary>



**Status:** undefined - **Code:** undefined


``` 
 {
    "status_code": 200,
    "response": {
        "cpf": [
            "12345678903"
        ],
        "expireAt": "2022-06-03T00:00:00.000Z",
        "_id": "6298beba72bdae000982488e",
        "ip": "220.110.20.6",
        "__v": 0,
        "errorExcess": false
    },
    "awsFilter": "https://sa-east-1.console.aws.amazon.com/cloudwatch/home?region=sa-east-1#logsV2:log-groups/log-group/$252Faws$252Flambda$252Faltu-fis-bradescard-dev-blacklist/log-events$3FfilterPattern$3D$2522a8216618-b84d-437d-99e3-c623f357d868$2522+$26start$3D1654177166000$26end$3D1654177766000"
}
```


</details>



<details>
<summary>401 | postBlacklist</summary>



**Status:** undefined - **Code:** undefined


``` 
 {
    "statusCode": 401,
    "message": "Unauthorized!",
    "awsFilter": "https://sa-east-1.console.aws.amazon.com/cloudwatch/home?region=sa-east-1#logsV2:log-groups/log-group/$252Faws$252Flambda$252Faltu-fis-bradescard-dev-blacklist/log-events$3FfilterPattern$3D$252262a1c3b0-4b94-4459-8880-2c11ced2a6f0$2522+$26start$3D1654177202000$26end$3D1654177802000"
}
```


</details>




[> Voltar ao Topo <](#top-document)

<br><br>

