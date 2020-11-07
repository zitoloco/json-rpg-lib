const { run } = require('../../src/json-rpg')

describe('type number values', () => {
  describe('with no value and no initial value', () => {
    it('should return "" (empty)', () => {
      const customRules = {
        groups: [
          {
            id: 'personal_data',
            fields: [
              {
                id: 'age',
                type: 'number'
              }
            ]
          }
        ]
      }

      const customChar = {}
      const resultChar = run(customRules, customChar)
      const desiredChar = [{ personal_data: { age: '' } }]

      expect(resultChar).toMatchObject(desiredChar)
    })
  })

  describe('with no value but with initial value', () => {
    it('should return the initial value', () => {
      const customRules = {
        groups: [
          {
            id: 'personal_data',
            visible: true,
            fields: [
              {
                id: 'age',
                type: 'number',
                initial: 20
              }
            ]
          }
        ]
      }

      const customChar = {}
      const resultChar = run(customRules, customChar)
      const desiredChar = [{ personal_data: { age: 20 } }]

      expect(resultChar).toMatchObject(desiredChar)
    })
  })
})
