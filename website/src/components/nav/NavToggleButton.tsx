import React from 'react'
import styled from 'styled-components'
import { useSpring, animated, to, config } from '@react-spring/web'
import media from '../../theming/mediaQueries'

interface NavToggleButtonProps {
    isOpen: boolean
    onClick: () => void
}

const SIZE = 32
const HALF_LENGTH = 11
const SPACING = 7

export const NavToggleButton = ({ isOpen, onClick }: NavToggleButtonProps) => {
    const first = useSpring({
        y: isOpen ? 0 : -SPACING,
        rotation: isOpen ? 45 : 0,
        config: config.wobbly,
    })
    const second = useSpring({
        x1: isOpen ? -HALF_LENGTH - 10 : -HALF_LENGTH,
        x2: isOpen ? 0 : HALF_LENGTH,
        opacity: isOpen ? 0 : 1,
        config: config.wobbly,
    })
    const third = useSpring({
        y: isOpen ? 0 : SPACING,
        rotation: isOpen ? -45 : 0,
        config: config.wobbly,
    })

    return (
        <Container onClick={onClick}>
            <svg width={SIZE} height={SIZE}>
                <g transform={`translate(${SIZE / 2}, ${SIZE / 2})`}>
                    <animated.line
                        x1={-HALF_LENGTH}
                        x2={HALF_LENGTH}
                        transform={to(
                            [first.y, first.rotation],
                            (y, rotation) => `translate(0, ${y}) rotate(${rotation})`
                        )}
                    />
                    <animated.line x1={second.x1} x2={second.x2} opacity={second.opacity} />
                    <animated.line
                        x1={-HALF_LENGTH}
                        x2={HALF_LENGTH}
                        transform={to(
                            [third.y, third.rotation],
                            (y, rotation) => `translate(0, ${y}) rotate(${rotation})`
                        )}
                    />
                </g>
            </svg>
        </Container>
    )
}

const Container = styled.div`
    height: ${({ theme }) => theme.dimensions.headerHeight}px;
    width: ${({ theme }) => theme.dimensions.headerHeight}px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    margin-left: 12px;

    & svg {
        stroke: #ffffff;
        stroke-width: 2;
        stroke-linecap: round;
    }

    ${media.tablet`
        & {
            margin-left: 0;
        }
    `}

    ${media.mobile`
        & {
            margin-left: 0;
        }
    `}
`
