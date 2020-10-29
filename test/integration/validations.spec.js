const { haveValidation } = require('../../src/utils/validate')

describe('validation', () => {
  describe('exist with one validation', () => {
    it('should return true', () => {
      const field = {
        id: 'name',
        type: 'text',
        validate: [
          'value.length > 1'
        ]
      }
      const value = haveValidation(field)

      expect(value).toBeTruthy()
    })
  })

  describe('exist with more than one validation', () => {
    it('should return true', () => {
      const field = {
        id: 'name',
        type: 'text',
        validate: [
          'value.length > 1',
          'value.length <= 10'
        ]
      }
      const value = haveValidation(field)

      expect(value).toBeTruthy()
    })
  })

  describe('exist with an empty array', () => {
    it('should return false', () => {
      const field = {
        id: 'name',
        type: 'text',
        validate: [

        ]
      }
      const value = haveValidation(field)

      expect(value).not.toBeTruthy()
    })
  })

  describe('not exist', () => {
    it('should return false', () => {
      const field = {
        id: 'name',
        type: 'text'
      }
      const value = haveValidation(field)

      expect(value).not.toBeTruthy()
    })
  })
})
