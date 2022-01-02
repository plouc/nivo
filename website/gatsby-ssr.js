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
