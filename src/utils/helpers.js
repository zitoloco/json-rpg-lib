const { find, propEq } = require('ramda')

function isVisibleGroup (groups) {
  return groups.visible !== false
}

function isEditable (editable) {
  return editable !== false
}

function getValues (target, data) {
  const [groupId, fieldId] = target.split('.')

  return find(propEq('id', fieldId))(find(propEq('id', groupId))(data.groups).fields).values
}

function validateValue (value, rules) {
  // eslint-disable-next-line prefer-const
  let errors = []

  rules.forEach(rule => {
    // eslint-disable-next-line no-eval
    if (!eval(rule)) {
      errors.push(rule)
    }
  })

  return errors
}

module.exports = {
  isVisibleGroup,
  isEditable,
  getValues,
  validateValue
}
