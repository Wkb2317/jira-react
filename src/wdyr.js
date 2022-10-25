import React from 'react'

// 最终组件的重复render情况
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React, {
    trackAllPureComponents: false
  })
}
