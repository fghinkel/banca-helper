import _isNumber from 'lodash/isNumber'

export const isNumber = (value: any): value is number => {
  return _isNumber(value) && !isNaN(value)
}
