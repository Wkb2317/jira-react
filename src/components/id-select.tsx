import React from 'react'
import { Select } from 'antd'

// 获取组件的所有props类型
type SelectType = React.ComponentProps<typeof Select>

interface IdSelectProps
  extends Omit<
    SelectType,
    'defaultOptionName' | 'options' | 'onChange' | 'value'
  > {
  value: string | number | null | undefined
  onChange: (value?: number) => void
  defaultOptionName?: string
  options?: { name: string; id: number }[]
}

// * value可以传入多种类型的值
// * onChange 只会回调number|undefined类型
// * 当isNaN(Number(value))为true时，代表选择默认类型
// * 当选择默认类型时，onChange会回调undefined
export function IdSelect(props: IdSelectProps) {
  const { value, onChange, defaultOptionName, options, ...restProps } = props

  return (
    <Select
      value={options?.length ? value : 0}
      onChange={(value) => onChange(toNumber(value))}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((item) => (
        <Select.Option value={item.id} key={item.id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  )
}

// 把字符转换成数字类型
const toNumber = (value: any) => (isNaN(Number(value)) ? 0 : Number(value))
