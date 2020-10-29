const { run } = require('../../src/json-rpg')

describe('type text values', () => {
  describe('with no value and no default value', () => {
    it('should return "undefined"', () => {
      const customRules = {
        groups: [
          {
            id: 'personal_data',
            visible: true,
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
      const desiredChar = [{ personal_data: { name: '' } }]

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
      const desiredChar = [{ personal_data: { name: 'Klauss Hoffmann' } }]

      expect(resultChar).toMatchObject(desiredChar)
    })
  })

  describe('with value and default value', () => {
    it('should return character value', () => {
      const customRules = {
        groups: [
          {
            id: 'personal_data',
            visible: true,
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
      const desiredChar = [{ personal_data: { name: 'Erick Hoffmann' } }]

      expect(resultChar).toMatchObject(desiredChar)
    })
  })

  describe('with value and default value not editable', () => {
    it('should return default value', () => {
      const customRules = {
        groups: [
          {
            id: 'personal_data',
            visible: true,
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
      const desiredChar = [{ personal_data: { name: 'Klauss Hoffmann' } }]

      expect(resultChar).toMatchObject(desiredChar)
    })
  })
})

describe('type text validations', () => {
  describe('with correct values', () => {
    it('should return an empty error array', () => {
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
      const desiredChar = [
        {
          personal_data: { name: 'Klauss Hoffmann', alias: 'x' },
          errors: []
        }
      ]

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
      const desiredChar = [
        {
          personal_data: { name: 'Klauss Hoffmann', alias: 'x' },
          errors: [
            {
              field: 'name',
              message: ['value.length <= 10']
            }
          ]
        }
      ]

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
      const desiredChar = [
        {
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
      ]

      // console.log(' resultChar: ', JSON.stringify(resultChar))
      // console.log('desiredChar: ', JSON.stringify(desiredChar))

      expect(resultChar).toMatchObject(desiredChar)
    })
  })
})
