const { run } = require('../../src/json-rpg')

describe('Test valid values', () => {
  describe('with correct values', () => {
    it('shouldn\'t return an error', () => {
      const customRules = {
        groups: [
          {
            id: 'personal_data',
            fields: [
              {
                id: 'name',
                type: 'text',
                validate: [
                  'value.length > 0',
                  'value.length <= 50'
                ]
              },
              {
                id: 'alias',
                type: 'text',
                validate: [
                  'value.length > 0',
                  'value.length <= 10'
                ]
              }
            ]
          }
        ]
      }

      const customChar = { name: 'Klauss Hoffmann', alias: 'x' }
      const resultChar = run(customRules, customChar)
      const desiredChar = {
        personal_data: { name: 'Klauss Hoffmann', alias: 'x' }
      }

      expect(resultChar).toMatchObject(desiredChar)
    })
  })

  describe('with one incorrect value', () => {
    it('should return validation error', () => {
      const customRules = {
        groups: [
          {
            id: 'personal_data',
            fields: [
              {
                id: 'name',
                type: 'text',
                validate: [
                  'value.length > 0',
                  'value.length <= 10'
                ]
              },
              {
                id: 'alias',
                type: 'text',
                validate: [
                  'value.length > 0',
                  'value.length <= 10'
                ]
              }
            ]
          }
        ]
      }

      const customChar = { name: 'Klauss Hoffmann', alias: 'x' }
      const resultChar = run(customRules, customChar)
      const desiredChar = {
        personal_data: { name: 'Klauss Hoffmann', alias: 'x' },
        errors: [
          {
            field: 'name',
            message: ['value.length <= 10']
          }
        ]
      }

      expect(resultChar).toMatchObject(desiredChar)
    })
  })

  describe('with two incorrect value', () => {
    it('should return validation error', () => {
      const customRules = {
        groups: [
          {
            id: 'personal_data',
            fields: [
              {
                id: 'name',
                type: 'text',
                validate: [
                  'value.length > 0',
                  'value.length <= 10'
                ]
              },
              {
                id: 'alias',
                type: 'text',
                validate: [
                  'value.length >= 3',
                  'value.length <= 10'
                ]
              }
            ]
          }
        ]
      }

      const customChar = { name: 'Klauss Hoffmann', alias: 'x' }
      const resultChar = run(customRules, customChar)
      const desiredChar = {
        personal_data: { name: 'Klauss Hoffmann', alias: 'x' },
        errors: [
          {
            field: 'name',
            message: ['value.length <= 10']
          },
          {
            field: 'alias',
            message: ['value.length >= 3']
          }
        ]
      }

      expect(resultChar).toMatchObject(desiredChar)
    })
  })
})
