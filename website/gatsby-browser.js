import React from 'react'
import { RootWrapper } from './src/components/RootWrapper'
import { PageWrapper } from './src/components/PageWrapper'

export const wrapRootElement = ({ element }) => (
    <RootWrapper>
        {element}
    </RootWrapper>
)

export const wrapPageElement = ({ element }) => (
    <PageWrapper>
        {element}
    </PageWrapper>
)

export const onServiceWorkerUpdateReady = () => {
    const answer = window.confirm([
        `The documentation has been updated,`,
        `would you like to reload to display the latest version?`
    ].join(''))
  
    if (answer === true) window.location.reload()
}