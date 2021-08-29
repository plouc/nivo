import React from 'react'
import PageWrapper from './src/components/PageWrapper'

export const wrapPageElement = ({ element }) => {
    return (
        <PageWrapper>
            {element}
        </PageWrapper>
    )
}

export const onServiceWorkerUpdateReady = () => {
    const answer = window.confirm([
        `The documentation has been updated,`,
        `would you like to reload to display the latest version?`
    ].join(''))
  
    if (answer === true) window.location.reload()
}