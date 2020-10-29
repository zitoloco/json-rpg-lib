# Json RPG

## Introdução

Json RPG é uma biblioteca criada para ajudar na criação de personagens de RPG.

Tendo em vista que a mecânica de criação de personagens de RPG é muito parecida,
independentemente do sistema, podemos mapear as regras de cada sistema e usá-las
para criar os personagens.

O resultado da biblioteca será um arquivo json do personagem criado. Assim, esse
**arquivo do personagem** pode ser usado para alimentar uma interface que criará
a ficha imprmível que conhecemos.

Para que a biblioteca possa gerar e validar o arquivo json do personagem é
preciso fornecer a ela um **arquivo de regras**.

## Arquivo de regras

### Grupos

Todas as informações ficam agrupadas dentro de um `group`.

```json
{
  "group": [
    {
      "id": "lists",
      "visible": false,
      "fields": []
    }
    {
      "id": "personal_data",
      "visible": true,
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
grupo possui. Os campos podem ter valores `text`, `number`, `select` ou
`choices`.

#### Campo de text

```json
{
  "id": "name",
  "type": "text",
  "editable": true,
  "initial": "Alberto Roberto"
}
```

| campo    | tipo    | descrição                                   | default | obrigatório |
| -------- | ------- | ------------------------------------------- | ------- | ----------- |
| id       | string  | identificação única do campo                | -       | sim         |
| type     | string  | tipo de conteudo do campo                   | -       | sim         |
| initial  | string  | valor inicial do campo                      | ''      | não         |
| editable | boolean | define se o campo pode ter o valor alterado | true    | não         |

#### Campo de number

```json
{
  "id": "name",
  "type": "number",
  "editable": true,
  "initial": 10
}
```

| campo    | tipo    | descrição                                   | default | obrigatório |
| -------- | ------- | ------------------------------------------- | ------- | ----------- |
| id       | string  | identificação única do campo                | -       | sim         |
| type     | string  | tipo de conteudo do campo                   | -       | sim         |
| initial  | integer | valor inicial do campo                      | 0       | sim         |
| editable | boolean | define se o campo pode ter o valor alterado | true    | não         |

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
| choices | array, string | lista de opções disponíveis  | -       | não         |

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
| choices | array  | lista de opções disponíveis  | -       | não         |
