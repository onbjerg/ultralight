import { INVALID_PARAMS } from '../../error-code.js'
export const content_params = {
  get ConnectionId() {
    return (params: any[], index: number) => {
      if (typeof params[index] !== 'number') {
        return {
          code: INVALID_PARAMS,
          message: `invalid argument ${index}: argument is not a number`,
        }
      }
    }
  },
  get Content() {
    return (params: any[], index: number) => {
      const result = baseTypes.hexString([params[index]], 0)
      if (result !== undefined) {
        return result
      }
    }
  },
  get ContentKey() {
    return (params: any[], index: number) => {
      const result = baseTypes.hexString([params[index]], 0)
      if (result !== undefined) {
        return result
      }
    }
  },
  get ContentKeys() {
    return (params: any[], index: number) => {
      if (!Array.isArray(params[index])) {
        return {
          code: INVALID_PARAMS,
          message: `invalid argument ${index}: argument is not an array`,
        }
      }
      for (const value of params[index]) {
        const result = baseTypes.hexString([value], 0)
        if (result !== undefined) return result
      }
    }
  },
  get Discv5Payload() {
    return (params: any[], index: number) => {
      const result = baseTypes.hexString([params[index]], 0)
      if (result !== undefined) {
        return result
      }
    }
  },
}