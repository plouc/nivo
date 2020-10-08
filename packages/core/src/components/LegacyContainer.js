import { useRef, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
    TooltipActionsContext,
    TooltipStateContext,
    useTooltipHandlers,
    Tooltip,
} from '@bitbloom/nivo-tooltip'
import noop from '../lib/noop'
import { ThemeProvider } from '../theming'
import { MotionConfigProvider } from '../motion'
import { ConditionalWrapper } from './ConditionalWrapper'

const containerStyle = {
    position: 'relative',
}

/**
 * This component should only be used when relying on render props,
 * passing `showTooltip`, `hideTooltip`, but you should use the regular
 * `Container` component.
 *
 * @deprecated
 */
export const LegacyContainer = ({
    children,
    theme,
    isInteractive = true,
    renderWrapper = true,
    animate,
    motionConfig,
}) => {
    const container = useRef(null)
    const { actions: tooltipActions, state: tooltipState } = useTooltipHandlers(container)

    const showTooltip = useCallback(
        (content, event) => tooltipActions.showTooltipFromEvent(content, event),
        [tooltipActions.showTooltipFromEvent]
    )

    const handlers = useMemo(
        () => ({
            showTooltip: isInteractive ? showTooltip : noop,
            hideTooltip: isInteractive ? tooltipActions.hideTooltip : noop,
        }),
        [tooltipActions.hideTooltip, isInteractive, showTooltip]
    )

    return (
        <ThemeProvider theme={theme}>
            <MotionConfigProvider animate={animate} config={motionConfig}>
                <TooltipActionsContext.Provider value={tooltipActions}>
                    <TooltipStateContext.Provider value={tooltipState}>
                        {/* we should not render the div element if using the HTTP API */}
                        <ConditionalWrapper
                            condition={renderWrapper}
                            wrapper={<div style={containerStyle} ref={container} />}
                        >
                            {children(handlers)}
                            {isInteractive && <Tooltip />}
                        </ConditionalWrapper>
                    </TooltipStateContext.Provider>
                </TooltipActionsContext.Provider>
            </MotionConfigProvider>
        </ThemeProvider>
    )
}

LegacyContainer.propTypes = {
    children: PropTypes.func.isRequired,
    isInteractive: PropTypes.bool,
    renderWrapper: PropTypes.bool,
    theme: PropTypes.object.isRequired,
    animate: PropTypes.bool.isRequired,
    motionConfig: PropTypes.string,
}
