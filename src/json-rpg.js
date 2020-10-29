const { isVisibleGroup, buildField, buildResponse } = require('./utils')

function run (rules, character) {
  return (
    rules.groups
      // filtra apenas pelos grupos visíveis
      .filter(isVisibleGroup)

      // percorre os grupos
      .map((group) => {
        return {
          id: group.id,

          // define o "fields" e percorre os campos
          fields: group.fields.map((field) => {
            return buildField(field, character)
          })
        }
      })
      .map(buildResponse)
  )
}

module.exports = {
  run
}
