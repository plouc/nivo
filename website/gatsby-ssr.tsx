import React from 'react'
import { GatsbySSR } from 'gatsby'
import { RootWrapper } from './src/components/RootWrapper'
import { PageWrapper } from './src/components/PageWrapper'

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => (
    <RootWrapper>
        {element}
    </RootWrapper>
)

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element }) => (
    <PageWrapper>
        {element}
    </PageWrapper>
)
