import React from 'react'
import { WrapPageElementBrowserArgs, WrapRootElementBrowserArgs } from 'gatsby'
import { RootWrapper } from './src/components/RootWrapper'
import { PageWrapper } from './src/components/PageWrapper'

export const wrapRootElement = ({ element }: WrapRootElementBrowserArgs) => (
    <RootWrapper>
        {element}
    </RootWrapper>
)

export const wrapPageElement = ({ element }: WrapPageElementBrowserArgs) => (
    <PageWrapper>
        {element}
    </PageWrapper>
)
