import React from 'react'
import { Rate } from 'antd'

type PinPropsType = React.ComponentProps<typeof Rate>

interface pinType extends PinPropsType {
  checked: boolean
  onPinChange?: (value: boolean) => void
}

export default function Pin(props: pinType) {
  const { checked, onPinChange, ...restProps } = props

  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(value) => onPinChange?.(!!value)}
      {...restProps}
    ></Rate>
  )
}
