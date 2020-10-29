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

  if (field.type === 'text') {
    if (haveValidation(field)) {
      field.validate.forEach((rule) => {
        const validateResult = validate(rule, field.value)

        if (validateResult) {
          errors.push(validateResult)
        }
      })
    }
  }

  return { ...field, errors }
}

module.exports = {
  haveValidation,
  validateField
}
