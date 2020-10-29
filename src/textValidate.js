module.exports = function textValidate (data) {
  if (typeof data.initial === 'undefined') {
    throw new ValidationException(`Field ${data.id} must be filled`)
  }

  if (typeof data.initial !== 'string') {
    throw new ValidationException(`Field ${data.id} must have text initial`)
  }

  if (data.max_length && data.initial.length > data.max_length) {
    throw new Error(
      `Field ${data.id} must have less than ${data.max_length} characters`
    )
  }
}
