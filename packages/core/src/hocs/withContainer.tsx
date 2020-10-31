/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component, ComponentType, PropsWithChildren, useRef } from 'react'
import { ThemeProvider, PartialTheme } from '../theming'
import { MotionConfigProvider, MotionConfigProviderProps } from '../motion'

const containerStyle = {
    position: 'relative',
} as const

export interface WithContainerProps {
    theme?: PartialTheme
    renderWrapper?: boolean
    animate?: MotionConfigProviderProps['animate']
    motionStiffness?: MotionConfigProviderProps['stiffness']
    motionDamping?: MotionConfigProviderProps['damping']
    motionConfig?: MotionConfigProviderProps['config']
}

const Container = ({
    theme,
    renderWrapper = true,
    children,
    animate,
    motionStiffness,
    motionDamping,
    motionConfig,
}: PropsWithChildren<WithContainerProps>) => {
    const container = useRef(null)
    // const {
    //     showTooltipAt,
    //     showTooltipFromEvent,
    //     hideTooltip,
    //     isTooltipVisible,
    //     tooltipContent,
    //     tooltipPosition,
    //     tooltipAnchor,
    // } = useTooltipHandlers(container)

    // return (
    //     <ThemeProvider theme={theme}>
    //         <MotionConfigProvider
    //             animate={animate}
    //             stiffness={motionStiffness}
    //             damping={motionDamping}
    //         >
    //             <TooltipContext.Provider
    //                 value={{ showTooltipAt, showTooltipFromEvent, hideTooltip }}
    //             >
    //                 {/* we should not render the div element if using the HTTP API */}
    //                 {renderWrapper === true && (
    //                     <div style={containerStyle} ref={container}>
    //                         {children}
    //                         {isTooltipVisible && (
    //                             <TooltipWrapper position={tooltipPosition} anchor={tooltipAnchor}>
    //                                 {tooltipContent}
    //                             </TooltipWrapper>
    //                         )}
    //                     </div>
    //                 )}
    //                 {renderWrapper !== true && children}
    //             </TooltipContext.Provider>
    //         </MotionConfigProvider>
    //     </ThemeProvider>
    // )
    return (
        <ThemeProvider theme={theme}>
            <MotionConfigProvider
                animate={animate}
                stiffness={motionStiffness}
                damping={motionDamping}
                config={motionConfig}
            >
                {/* we should not render the div element if using the HTTP API */}
                {renderWrapper === true && (
                    <div style={containerStyle} ref={container}>
                        {children}
                    </div>
                )}
                {renderWrapper !== true && children}
            </MotionConfigProvider>
        </ThemeProvider>
    )
}

export const withContainer = (WrappedComponent: ComponentType<any>) => {
    // eslint-disable-next-line react/display-name
    return class extends Component<WithContainerProps & Record<string, unknown>> {
        render() {
            const { theme, renderWrapper, ...childProps } = this.props

            return (
                <Container
                    theme={theme}
                    renderWrapper={renderWrapper}
                    animate={childProps.animate}
                    motionStiffness={childProps.motionStiffness}
                    motionDamping={childProps.motionDamping}
                    motionConfig={childProps.motionConfig}
                >
                    <WrappedComponent {...childProps} />
                </Container>
            )
        }
    }
}
