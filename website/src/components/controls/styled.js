import React from 'react'
import styled from 'styled-components'
import RightIcon from 'react-icons/lib/md/keyboard-arrow-right'
import DownIcon from 'react-icons/lib/md/keyboard-arrow-down'
import media from '../../theming/mediaQueries'

export const ToggleWrapper = styled.div`
    position: absolute;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    top: 50%;
    margin-top: -13px;
    right: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.borderLight};
    color: ${({ theme }) => theme.colors.textLight};
    transition: transform 200ms ease-out;

    ${media.tablet`
        & {
            right: 20px;
        }
    `}

    ${media.mobile`
        & {
            right: 20px;
        }
    `}
`

export const Cell = styled.div`
    position: relative;
    font-size: 0.9rem;

    ${media.desktopLarge`
        & {
            padding: 14px 40px;
        }
    `}

    ${media.desktop`
        & {
            padding: 14px 30px;
        }
    `}

    ${media.tablet`
        & {
            padding: 14px 20px 14px 30px;
        }
    `}

    ${media.mobile`
        & {
            padding: 14px 20px 14px 30px;
        }
    `}

    &:hover {
        ${ToggleWrapper} {
            color: ${({ theme }) => theme.colors.text};
            transform: scale(1.2);
        }
    }
`

export const Toggle = ({ isOpened }) => (
    <ToggleWrapper>
        {isOpened && <DownIcon size={18} />}
        {!isOpened && <RightIcon size={18} />}
    </ToggleWrapper>
)
