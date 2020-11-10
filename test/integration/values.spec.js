const { run } = require('../../src/json-rpg')

describe('Test values, initial values and editable flag', () => {
  describe('text with no value and no default value', () => {
    it('should return "undefined"', () => {
      const customRules = {
        groups: [
          {
            id: 'personal_data',
            fields: [
              {
                id: 'name',
                type: 'text'
              }
            ]
          }
        ]
      }

      const customChar = {}
      const resultChar = run(customRules, customChar)
      const desiredChar = { personal_data: { name: undefined } }

      expect(resultChar).toMatchObject(desiredChar)
    })
  })

  describe('text with no value but with initial value', () => {
    it('should return the initial value', () => {
      const customRules = {
        groups: [
          {
            id: 'personal_data',
            fields: [
              {
                id: 'name',
                type: 'text',
                initial: 'Klauss Hoffmann'
              }
            ]
          }
        ]
      }

      const customChar = {}
      const resultChar = run(customRules, customChar)
      const desiredChar = { personal_data: { name: 'Klauss Hoffmann' } }

      expect(resultChar).toMatchObject(desiredChar)
    })
  })

  describe('text with value and default value', () => {
    it('should return character value', () => {
      const customRules = {
        groups: [
          {
            id: 'personal_data',
            fields: [
              {
                id: 'name',
                type: 'text',
                initial: 'Klauss Hoffmann'
              }
            ]
          }
        ]
      }

      const customChar = { name: 'Erick Hoffmann' }
      const resultChar = run(customRules, customChar)
      const desiredChar = { personal_data: { name: 'Erick Hoffmann' } }

      expect(resultChar).toMatchObject(desiredChar)
    })
  })

  describe('text with value and default value not editable', () => {
    it('should return default value', () => {
      const customRules = {
        groups: [
          {
            id: 'personal_data',
            fields: [
              {
                id: 'name',
                type: 'text',
                editable: false,
                initial: 'Klauss Hoffmann'
              }
            ]
          }
        ]
      }

      const customChar = { name: 'Erick Hoffmann' }
      const resultChar = run(customRules, customChar)
      const desiredChar = { personal_data: { name: 'Klauss Hoffmann' } }

      expect(resultChar).toMatchObject(desiredChar)
    })
  })

  describe('number with no value and no initial value', () => {
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
      const desiredChar = { personal_data: { age: undefined } }

      expect(resultChar).toMatchObject(desiredChar)
    })
  })

  describe('number with no value but with initial value', () => {
    it('should return the initial value', () => {
      const customRules = {
        groups: [
          {
            id: 'personal_data',
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
      const desiredChar = { personal_data: { age: 20 } }

      expect(resultChar).toMatchObject(desiredChar)
    })
  })

  describe('number with value and default value', () => {
    it('should return character value', () => {
      const customRules = {
        groups: [
          {
            id: 'personal_data',
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

      const customChar = { age: 23 }
      const resultChar = run(customRules, customChar)
      const desiredChar = { personal_data: { age: 23 } }

      expect(resultChar).toMatchObject(desiredChar)
    })
  })

  describe('number with value and default value not editable', () => {
    it('should return default value', () => {
      const customRules = {
        groups: [
          {
            id: 'personal_data',
            fields: [
              {
                id: 'age',
                type: 'number',
                editable: false,
                initial: 20
              }
            ]
          }
        ]
      }

      const customChar = { age: 23 }
      const resultChar = run(customRules, customChar)
      const desiredChar = { personal_data: { age: 20 } }

      expect(resultChar).toMatchObject(desiredChar)
    })
  })

  describe('select with valid choice value', () => {
    it('should return value', () => {
      const customRules = {
        groups: [
          {
            id: 'personal_data',
            fields: [
              {
                id: 'race',
                type: 'select',
                choices: ['human', 'elf', 'dwarf']
              }
            ]
          }
        ]
      }

      const customChar = { race: 'elf' }
      const resultChar = run(customRules, customChar)
      const desiredChar = { personal_data: { race: 'elf' } }
      expect(resultChar).toEqual(desiredChar)
    })
  })

  describe('select with INVALID choice value', () => {
    it('should return an error', () => {
      const customRules = {
        groups: [
          {
            id: 'personal_data',
            fields: [
              {
                id: 'race',
                type: 'select',
                choices: ['human', 'elf', 'dwarf']
              }
            ]
          }
        ]
      }

      const customChar = { race: 'ork' }
      const resultChar = run(customRules, customChar)
      const desiredChar = {
        personal_data: { race: 'ork' },
        errors: [
          {
            field: 'race',
            value: 'ork',
            message: ['Invalid choice: "ork"']
          }
        ]
      }
      expect(resultChar).toEqual(desiredChar)
    })
  })
})
