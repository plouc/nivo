import React, { forwardRef, useImperativeHandle } from 'react'
import { useSpring, animated, easings } from '@react-spring/web'
import styled from 'styled-components'

export interface ChartCaptureEffectHandle {
    trigger: () => void
}

const DURATION = 800
const FRAME_PADDING = 12
const FRAME_CORNER_SIZE = 18

export const ChartCaptureEffect = forwardRef<ChartCaptureEffectHandle>((_props, ref) => {
    const [styles, api] = useSpring(() => ({
        from: { opacity: 0 },
        opacity: 0,
    }))

    useImperativeHandle(
        ref,
        () => ({
            trigger: () => {
                api.start({
                    reset: true,
                    from: { opacity: 0 },
                    to: async next => {
                        await next({
                            opacity: 1,
                            config: {
                                duration: DURATION * 0.2,
                                easing: easings.easeInCubic,
                            },
                        })

                        await next({
                            opacity: 0,
                            delay: DURATION * 0.1,
                            config: {
                                duration: DURATION * 0.7,
                                easing: easings.easeOutBounce,
                            },
                        })
                    },
                })
            },
        }),
        [api]
    )

    return (
        <Overlay
            style={{
                opacity: styles.opacity,
            }}
        >
            <CornerTopLeft />
            <CornerTopRight />
            <CornerBottomRight />
            <CornerBottomLeft />
        </Overlay>
    )
})

const Overlay = styled(animated.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-color: ${({ theme }) => theme.colors.cardBackground};
`

const Corner = styled.span`
    position: absolute;
    width: ${FRAME_CORNER_SIZE}px;
    height: ${FRAME_CORNER_SIZE}px;
    border: 1px solid ${({ theme }) => theme.colors.text};
`

const CornerTopLeft = styled(Corner)`
    top: ${FRAME_PADDING}px;
    left: ${FRAME_PADDING}px;
    border-right-width: 0;
    border-bottom-width: 0;
`

const CornerTopRight = styled(Corner)`
    top: ${FRAME_PADDING}px;
    right: ${FRAME_PADDING}px;
    border-left-width: 0;
    border-bottom-width: 0;
`

const CornerBottomRight = styled(Corner)`
    bottom: ${FRAME_PADDING}px;
    right: ${FRAME_PADDING}px;
    border-top-width: 0;
    border-left-width: 0;
`

const CornerBottomLeft = styled(Corner)`
    bottom: ${FRAME_PADDING}px;
    left: ${FRAME_PADDING}px;
    border-top-width: 0;
    border-right-width: 0;
`
