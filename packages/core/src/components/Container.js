import { useRef } from 'react'
import { TooltipProvider, Tooltip } from '@nivo/tooltip'
import { ThemeProvider } from '@nivo/theming'
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
    motionConfig,
}) => {
    const container = useRef(null)

    return (
        <ThemeProvider theme={theme}>
            <MotionConfigProvider animate={animate} config={motionConfig}>
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

export default Container
