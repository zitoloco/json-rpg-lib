const { mergeAll } = require('ramda')
const { validateField } = require('./validate')

function isVisibleGroup (group) {
  return group.visible !== false
}

function isEditable (editable) {
  return editable !== false
}

function setValue (editable, field, character) {
  if (!editable) {
    return field.initial || ''
  }
  return character[field.id] || field.initial || ''
}

function buildField (field, character) {
  const editable = isEditable(field.editable)

  const value = setValue(editable, field, character)

  const fieldWithInitial = { ...field, editable, value }

  const validatedField = validateField(fieldWithInitial)

  return validatedField
}

function buildResponse (group) {
  const response = {
    [group.id]: mergeAll(
      group.fields.map((field) => {
        return { [field.id]: field.value }
      })
    )
  }

  const errors = []

  group.fields.forEach(field => {
    if (field.errors.length > 0) {
      errors.push({ field: field.id, message: field.errors })
    }
  })

  return { ...response, errors }
}

module.exports = {
  isVisibleGroup,
  buildField,
  buildResponse,
  isEditable,
  setValue
}
