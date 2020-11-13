const {
  buildSkeleton,
  validateSkeleton,
  responseBuilder
} = require('./utils/skeleton')

function run (rules, character) {
  const data = { ...rules, character }
  const skeleton = buildSkeleton(data)
  const validSkeleton = validateSkeleton(skeleton)

  return responseBuilder(validSkeleton)
}

module.exports = {
  run
}
