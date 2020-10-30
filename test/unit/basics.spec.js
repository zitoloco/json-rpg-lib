const { isEditable, isVisibleGroup, setValue } = require('../../src/utils')

describe('isEditable', () => {
  describe('true', () => {
    it('should return true', () => {
      const value = isEditable(true)

      expect(value).toBeTruthy()
    })
  })

  describe('empty', () => {
    it('should return true', () => {
      const value = isEditable('')

      expect(value).toBeTruthy()
    })
  })

  describe('null', () => {
    it('should return true', () => {
      const value = isEditable(null)

      expect(value).toBeTruthy()
    })
  })

  describe('undefined', () => {
    it('should return true', () => {
      const value = isEditable(undefined)

      expect(value).toBeTruthy()
    })
  })

  describe('NaN', () => {
    it('should return true', () => {
      const value = isEditable(NaN)

      expect(value).toBeTruthy()
    })
  })

  describe('0 (zero)', () => {
    it('should return true', () => {
      const value = isEditable(0)

      expect(value).toBeTruthy()
    })
  })

  describe('false', () => {
    it('should return false', () => {
      const value = isEditable(false)

      expect(value).not.toBeTruthy()
    })
  })
})

describe('isVisibleGroup', () => {
  describe('true', () => {
    it('should return true', () => {
      const group = { visible: true }
      const value = isVisibleGroup(group)

      expect(value).toBeTruthy()
    })
  })

  describe('empty', () => {
    it('should return true', () => {
      const group = { visible: '' }
      const value = isVisibleGroup(group)

      expect(value).toBeTruthy()
    })
  })

  describe('null', () => {
    it('should return true', () => {
      const group = { visible: null }
      const value = isVisibleGroup(group)

      expect(value).toBeTruthy()
    })
  })

  describe('undefined', () => {
    it('should return true', () => {
      const group = { visible: undefined }
      const value = isVisibleGroup(group)

      expect(value).toBeTruthy()
    })
  })

  describe('NaN', () => {
    it('should return true', () => {
      const group = { visible: NaN }
      const value = isVisibleGroup(group)

      expect(value).toBeTruthy()
    })
  })

  describe('0 (zero)', () => {
    it('should return true', () => {
      const group = { visible: 0 }
      const value = isVisibleGroup(group)

      expect(value).toBeTruthy()
    })
  })

  describe('false', () => {
    it('should return false', () => {
      const group = { visible: false }
      const value = isVisibleGroup(group)

      expect(value).not.toBeTruthy()
    })
  })
})

describe('setValue', () => {
  describe('not editable', () => {
    it('should return initial value', () => {
      const field = {
        id: 'name',
        type: 'text',
        initial: 'initial value',
        editable: false
      }
      const character = { name: 'defined new value' }
      const value = setValue(false, field, character)

      expect(value).toBe('initial value')
    })
  })

  describe('editable', () => {
    it('should return character value', () => {
      const field = {
        id: 'name',
        type: 'text',
        initial: 'initial value'
      }
      const character = { name: 'defined new value' }
      const value = setValue(true, field, character)

      expect(value).toBe('defined new value')
    })
  })

  describe('not editable and with no inicial value', () => {
    it('should return empty', () => {
      const field = {
        id: 'name',
        type: 'text',
        initial: '',
        editable: false
      }
      const character = { name: 'defined new value' }
      const value = setValue(false, field, character)

      expect(value).toBe('')
    })
  })
})
