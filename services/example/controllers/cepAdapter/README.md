# CEP Adapter

Essa API serve para pegar os dados de endereço de acordo com o CEP informado.

## Parâmetros Obrigatórios

- cep
  - **O que é?** Código de Endereço Postal
  - **De onde vem?** De acordo com a região do endereço

## Request

- Endpoint - `https://api.example.com.br/example-service-dev/cepAdapter`
- Método - `GET`

## Uso
```
  /cepAdapter?cep=70705910
```

## Retorno

- Quanto foi encontrado
```json
{
    "status_code": 200,
    "endereco": {
        "logradouro": "Rua Alberto José Werdine",
        "bairro": "Varginha",
        "localidade": "Itajubá",
        "uf": "MG",
        "cep": "37501364"
    }
}
```

- Quando não foi encontrado
```json
{
    "status_code": 200,
    "endereco": {
      "logradouro": null,
      "bairro": null,
      "localidade": null,
      "uf": null,
      "cep": null
    }
}
```

- Faltando parametros

```json
{
    "status_code": 400,
    "error": "Parametro Invalido"
}
```