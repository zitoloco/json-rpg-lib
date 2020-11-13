const { find, mergeAll, propEq } = require('ramda')

function isVisibleGroup (group) {
  return group.visible !== false
}

function isEditable (editable) {
  return editable !== false
}

function getValues (target, data) {
  const [groupId, fieldId] = target.split('.')

  return find(propEq('id', fieldId))(find(propEq('id', groupId))(data.groups).fields).values
}

function buildSkeleton (data) {
  const groups = data.groups.map(group => {
    return {
      ...group,
      fields: group.fields.map(field => {
        if (data.character[field.id]) {
          field = { ...field, value: data.character[field.id] }
        }

        if (field.type === 'select' && typeof field.choices === 'string') {
          field = { ...field, choices: getValues(field.choices, data) }
        }

        if (!field.value && field.initial && !data.character[field.id]) {
          field = { ...field, value: field.initial }
        }

        if (field.initial && !isEditable(field.editable)) {
          field = { ...field, value: field.initial }
        }

        return field
      })
    }
  })

  return { ...data, groups }
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

function validateSkeleton (data) {
  let errors = []

  data.groups.forEach(group => {
    group.fields.forEach(field => {
      if (['text', 'number'].includes(field.type)) {
        if (field.validate instanceof Array && field.validate.length > 0) {
        // valida os ampos do tipo text e number
          const errorsFounded = validateValue(field.value, field.validate)

          if (errorsFounded.length) {
            errors = [...errors, {
              field: field.id,
              value: field.value,
              message: errorsFounded
            }]
          }
        }
      }

      // valida os campos select
      if (['select'].includes(field.type)) {
        if (!field.choices.includes(field.value)) {
          errors = [...errors, {
            field: field.id,
            value: field.value,
            message: [`Invalid choice: "${field.value}"`]
          }]
        }
      }
    })
  })

  return { ...data, errors }
}

function responseBuilder (data) {
  const visibleGroups = data.groups.filter(isVisibleGroup)
  const errors = { errors: data.errors }

  const groups = visibleGroups.map(group => {
    return {
      [group.id]: mergeAll(group.fields.map(field => {
        return {
          [field.id]: field.value
        }
      }))
    }
  })

  if (data.errors.length > 0) {
    return mergeAll([...groups, errors])
  }

  return mergeAll(groups)
}

function run (rules, character) {
  const data = { ...rules, character }
  const skeleton = buildSkeleton(data)
  const validSkeleton = validateSkeleton(skeleton)

  return responseBuilder(validSkeleton)
}

module.exports = {
  run
}
