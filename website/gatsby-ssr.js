import React from 'react'
import PageWrapper from './src/components/PageWrapper'

export const wrapRootElement = ({ element }) => {
    return (
        <PageWrapper>
            {element}
        </PageWrapper>
    )
}