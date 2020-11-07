function haveValidation (field) {
  if (typeof field.validate === 'object' && field.validate.length > 0) {
    return true
  }

  return false
}

function validate (rule, value) {
  // eslint-disable-next-line no-eval
  if (!eval(rule)) {
    return rule
  }

  return false
}

function validateField (field) {
  const errors = []

  if (['text', 'number'].includes(field.type)) {
    if (haveValidation(field)) {
      field.validate.forEach((rule) => {
        const validateResult = validate(rule, field.value)

        if (validateResult) {
          errors.push(validateResult)
        }
      })
    }
  }

  if (field.type === 'choices') {
    if (!field.initial.includes(field.value)) {
      errors.push(`Invalid choice: "${field.value}"`)
    }
  }

  return { ...field, errors }
}

module.exports = {
  haveValidation,
  validateField
}
