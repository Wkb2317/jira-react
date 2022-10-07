// 判断是不是为0
const isZero = (val: unknown) => (val === 0 ? true : !!val)

export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object
}

// 删除参数中的空白参数
export const cleanObject = (obj: object) => {
  const objCopy = { ...obj }
  Object.keys(obj).forEach((key: string) => {
    let value
    if (isValidKey(key, obj)) {
      value = obj[key]
    }

    if (!isZero(value)) {
      if (isValidKey(key, objCopy)) {
        delete objCopy[key]
      }
    }
  })

  return objCopy
}
