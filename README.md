# Json RPG

## Introdução

Json RPG é uma biblioteca criada para ajudar na criação de personagens de RPG.

Tendo em vista que a mecânica de criação de personagens de RPG é muito parecida,
independentemente do sistema, podemos mapear as regras de cada sistema e usá-las
para criar os personagens.

O resultado da biblioteca será um arquivo json do personagem criado. Assim, esse
**arquivo do personagem** pode ser usado para alimentar uma interface que criará
a ficha imprimível que conhecemos.

Para que a biblioteca possa gerar e validar o arquivo json do personagem é
preciso fornecer a ela um **arquivo de regras**.

## Arquivo de regras

### Grupos

Todas as informações ficam agrupadas dentro de um `group`.

No exemplo abaixo foi criado um grupo para armazenar listas e um outro grupo 
para os dados pessoais do personagem.

```json
{
  "groups": [
    {
      "id": "lists",
      "fields": []
    }
    {
      "id": "personal_data",
      "fields": []
    }
  ]
}
```

| campo   | tipo    | descrição                                    | default | obrigatório |
| ------- | ------- | -------------------------------------------- | ------- | ----------- |
| id      | string  | identificação única do campo                 | -       | sim         |
| fields  | array   | lista de campos o grupo                      | -       | sim         |
| visible | boolean | define se o grupo será mostrado no resultado | true    | não         |

---

### Fields

O campo `fields` fica dentro de um grupo e ele contém todos os campos que o
grupo possui. 

Quando pensamos que pos dados básico de um porsonagem podem ser:
- nome do jogador
- nome do personagem
- idade
- peso

Cada um desses dados se torna um `field` dentro do json. 

Os campos podem ter valores `text`, `number`, `select` ou
`choices`.

#### Campo de text

Exempo de campos de texto.

```json
{
  "id": "player_name",
  "type": "text",
},
{
  "id": "character_name",
  "type": "text",
}
```

| campo    | tipo    | descrição                                   | default | obrigatório |
| -------- | ------- | ------------------------------------------- | ------- | ----------- |
| id       | string  | identificação única do campo                | -       | sim         |
| type     | string  | tipo de conteudo do campo                   | -       | sim         |
| editable | boolean | define se o campo pode ter o valor alterado | true    | não         |
| initial  | string  | valor inicial do campo                      | ''      | não         |

#### Campo de number

Exemplo de campos numéricos.

```json
{
  "id": "age",
  "type": "number",
},
{
  "id": "weight",
  "type": "number",
}
```

| campo    | tipo    | descrição                                   | default | obrigatório |
| -------- | ------- | ------------------------------------------- | ------- | ----------- |
| id       | string  | identificação única do campo                | -       | sim         |
| type     | string  | tipo de conteudo do campo                   | -       | sim         |
| editable | boolean | define se o campo pode ter o valor alterado | true    | não         |
| initial  | integer | valor inicial do campo                      | 0       | sim         |

#### Campo de select

```json
{
  "id": "name",
  "type": "select",
  "choices": ["option1", "option2"]
}
```

É possível obter as `choices` de um campo de `choices`

| campo   | tipo          | descrição                    | default | obrigatório |
| ------- | ------------- | ---------------------------- | ------- | ----------- |
| id      | string        | identificação única do campo | -       | sim         |
| type    | string        | tipo de conteudo do campo    | -       | sim         |
| choices | array, string | lista de opções disponíveis  | -       | sim         |

Para obter as `choices` de um campo `choices`:

```json
{
  "id": "name",
  "type": "select",
  "choices": "group_id.choice_id"
}
```

#### Campo de choices

```json
{
  "id": "name",
  "type": "choices",
  "initial": ["option1", "option2"]
}
```

| campo   | tipo   | descrição                    | default | obrigatório |
| ------- | ------ | ---------------------------- | ------- | ----------- |
| id      | string | identificação única do campo | -       | sim         |
| type    | string | tipo de conteudo do campo    | -       | sim         |
| choices | array  | lista de opções disponíveis  | -       | sim         |
