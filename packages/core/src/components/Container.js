/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useRef } from 'react'
import PropTypes from 'prop-types'
<<<<<<< HEAD
import { tooltipContext } from '@bitbloom/nivo-tooltip'
import noop from '../lib/noop'
import { themeContext } from '../theming'
=======
import { TooltipProvider, Tooltip } from '@nivo/tooltip'
import { ThemeProvider } from '../theming'
>>>>>>> 53b9c1cc7b439d550e8c2084bbd420c334082881
import { MotionConfigProvider } from '../motion'
import { ConditionalWrapper } from './ConditionalWrapper'

const containerStyle = {
    position: 'relative',
}

export const Container = ({
    children,
    theme,
    renderWrapper = true,
    isInteractive = true,
    animate,
    motionStiffness,
    motionDamping,
    motionConfig,
}) => {
    const container = useRef(null)

    return (
        <ThemeProvider theme={theme}>
            <MotionConfigProvider
                animate={animate}
                stiffness={motionStiffness}
                damping={motionDamping}
                config={motionConfig}
            >
                <TooltipProvider container={container}>
                    {/* we should not render the div element if using the HTTP API */}
                    <ConditionalWrapper
                        condition={renderWrapper}
                        wrapper={<div style={containerStyle} ref={container} />}
                    >
                        {children}
                        {isInteractive && <Tooltip />}
                    </ConditionalWrapper>
                </TooltipProvider>
            </MotionConfigProvider>
        </ThemeProvider>
    )
}

Container.propTypes = {
    children: PropTypes.element.isRequired,
    isInteractive: PropTypes.bool,
    renderWrapper: PropTypes.bool,
    theme: PropTypes.object,
    animate: PropTypes.bool,
    motionStiffness: PropTypes.number,
    motionDamping: PropTypes.number,
    motionConfig: PropTypes.string,
}

export default Container
