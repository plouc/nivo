import React from 'react'
import { GlobalStyle } from '../theming/GlobalStyle'

export const PageWrapper = ({ children }: { children: any }) => {
    const isCapturing =
        children.props &&
        children.props.location &&
        children.props.location.search.indexOf('capture=1') !== -1

    return (
        <>
            <GlobalStyle isCapturing={isCapturing} />
            <div className={isCapturing ? 'isCapturing' : ''}>{children}</div>
        </>
    )
}
