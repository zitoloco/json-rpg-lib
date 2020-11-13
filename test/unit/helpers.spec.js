const {
  isVisibleGroup,
  isEditable,
  getValues,
  validateValue
} = require('../../src/utils/helpers')

describe('unit tests: isVisibleGroup', () => {
  describe('when called with true', () => {
    it('should return true', () => {
      expect(isVisibleGroup({ visible: true })).toBeTruthy()
    })
  })

  describe('when called with undefined', () => {
    it('should return true', () => {
      expect(isVisibleGroup({ visible: undefined })).toBeTruthy()
    })
  })

  describe('when called with ""', () => {
    it('should return true', () => {
      expect(isVisibleGroup({ visible: '' })).toBeTruthy()
    })
  })

  describe('when called with false', () => {
    it('should return false', () => {
      expect(isVisibleGroup({ visible: false })).not.toBeTruthy()
    })
  })
})

describe('unit tests: isEditable', () => {
  describe('when called with true', () => {
    it('should return true', () => {
      expect(isEditable(true)).toBeTruthy()
    })
  })

  describe('when called with empty value', () => {
    it('should return true', () => {
      expect(isEditable()).toBeTruthy()
    })
  })

  describe('when called with ""', () => {
    it('should return true', () => {
      expect(isEditable('')).toBeTruthy()
    })
  })

  describe('when called with false', () => {
    it('should return false', () => {
      expect(isEditable(false)).not.toBeTruthy()
    })
  })
})

describe('unit test: getValues', () => {
  describe('when called to text source', () => {
    it('should return the text value', () => {
      const source = {
        groups: [{
          id: 'lists',
          fields: [
            {
              id: 'name',
              type: 'text',
              values: 'Klauss Hoffmann'
            }
          ]
        }]
      }

      const value = getValues('lists.name', source)
      const desireValue = 'Klauss Hoffmann'

      expect(value).toEqual(desireValue)
    })
  })

  describe('when called to array source', () => {
    it('should return the array values', () => {
      const source = {
        groups: [{
          id: 'lists',
          fields: [
            {
              id: 'metatypes',
              type: 'choices',
              values: ['human', 'elf', 'dwarf', 'ork', 'troll']
            }
          ]
        }]
      }

      const values = getValues('lists.metatypes', source)
      const desireValues = ['human', 'elf', 'dwarf', 'ork', 'troll']

      expect(values).toMatchObject(desireValues)
    })
  })
})
