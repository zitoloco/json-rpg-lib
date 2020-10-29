const { run } = require('./src/json-rpg')

const rules = require('./src/rules/shadowrun-rule')
const char = require('./src/chars/shadowrun-anker')

const anker = run(rules, char)

console.log(JSON.stringify(anker))
