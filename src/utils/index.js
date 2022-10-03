// 判断是不是为0
const isZero = (val) => (val === 0 ? true : !!val)

// 删除参数中的空白参数
export const cleanObject = (obj) => {
  const objCopy = { ...obj }
  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    if (!isZero(value)) {
      delete objCopy[key]
    }
  })

  return objCopy
}
