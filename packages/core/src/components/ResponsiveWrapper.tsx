/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback, ReactNode } from 'react'
import Measure, { ContentRect } from 'react-measure'

interface ResponsiveWrapperProps {
    children: (dimensions: { width: number; height: number }) => ReactNode
}

export const ResponsiveWrapper = ({ children }: ResponsiveWrapperProps) => {
    const [dimensions, setDimensions] = useState({
        width: -1,
        height: -1,
    })

    const shouldRender = dimensions.width > 0 && dimensions.height > 0

    const handleResize = useCallback(
        (contentRect: ContentRect) => {
            setDimensions({
                width: contentRect.bounds!.width,
                height: contentRect.bounds!.height,
            })
        },
        [setDimensions]
    )

    return (
        <Measure bounds onResize={handleResize}>
            {({ measureRef }) => (
                <div ref={measureRef} style={{ width: '100%', height: '100%' }}>
                    {shouldRender &&
                        children({ width: dimensions.width, height: dimensions.height })}
                </div>
            )}
        </Measure>
    )
}
