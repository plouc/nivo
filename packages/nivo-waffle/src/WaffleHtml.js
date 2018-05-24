/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Container } from '@nivo/core'
import enhance from './enhance'

const WaffleHtml = ({
    // dimensions
    margin,
    outerWidth,
    outerHeight,

    // styling
    theme,

    // motion
    animate,
    motionStiffness,
    motionDamping,

    // interactivity
    isInteractive,
    onClick,
}) => {
    const springConfig = {
        stiffness: motionStiffness,
        damping: motionDamping,
    }

    return (
        <Container theme={theme}>
            {({ showTooltip, hideTooltip }) => (
                <div
                    style={{
                        position: 'relative',
                        width: outerWidth,
                        height: outerHeight,
                    }}
                >
                    <div>YO!</div>
                </div>
            )}
        </Container>
    )
}

WaffleHtml.displayName = 'WaffleHtml'

export default enhance(WaffleHtml)
