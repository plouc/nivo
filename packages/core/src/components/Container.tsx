/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { CSSProperties, useRef } from 'react'
import { TooltipProvider, Tooltip } from '@nivo/tooltip'
import { defaultTheme, ThemeProvider } from '../theming'
import { defaultMotionProps, MotionConfigProvider } from '../motion'
import { ConditionalWrapper } from './ConditionalWrapper'
import { ContainerProps } from './types'

const containerStyle = {
    position: 'relative',
} as CSSProperties

export const Container = ({
    children,
    theme = defaultTheme,
    renderWrapper = true,
    isInteractive = true,
    animate = true,
    motionStiffness = defaultMotionProps['stiffness'],
    motionDamping = defaultMotionProps['damping'],
    motionConfig = defaultMotionProps['config'],
}: ContainerProps) => {
    const container = useRef<HTMLDivElement | null>(null)

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
