import React from 'react'
import capitalize from 'lodash/capitalize.js'
import styled from 'styled-components'
import { FaXmark } from 'react-icons/fa6'
import { ScaleType } from '@nivo/scales'
import media from '../../../theming/mediaQueries'
import { CodeBlock } from '../../CodeBlock'

export const ScaleDemoToggle = styled.div`
    position: relative;
    top: -20px;
    max-width: 800px;
    margin: 0 auto 50px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 3px;
    background: ${({ theme }) => theme.colors.cardAltBackground};
    color: ${({ theme }) => theme.colors.textLight};
    padding: 7px 16px 7px 9px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;

    &:hover {
        background-color: ${({ theme }) => theme.colors.cardBackground};
        color: ${({ theme }) => theme.colors.text};
    }

    svg:first-child {
        color: ${({ theme }) => theme.colors.accent};
        font-size: 20px;
        margin-right: 6px;
    }

    ${media.tablet`
        & {
            margin: 0 15px 50px;
        }
    `}

    ${media.mobile`
        & {
            margin: 0 15px 50px;
        }
    `}
`

export const ScaleDemoContainer = styled.div`
    position: relative;
    top: -20px;
    background: ${({ theme }) => theme.colors.cardBackground};
    margin-bottom: 40px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-left-width: 0;
    border-right-width: 0;
    box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.035);
    display: grid;
    grid-template-columns: 300px auto;
    grid-template-rows: 46px auto;
    overflow: hidden;

    ${media.mobile`
        & {
            grid-template-columns: 1fr;
            grid-template-rows: unset;
        }
    `}
`

export const ScaleDemoHeader = ({ type, onClose }: { type: ScaleType; onClose: () => void }) => (
    <ScaleDemoHeaderContainer>
        <span>{capitalize(type)} scale config</span>
        <ScaleDemoCloseButton onClick={onClose}>
            <FaXmark />
        </ScaleDemoCloseButton>
    </ScaleDemoHeaderContainer>
)

const ScaleDemoHeaderContainer = styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
    min-height: 46px;
    padding: 0 0 0 16px;
    margin: 0;
    color: ${({ theme }) => theme.colors.accent};
    font-size: 14px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const ScaleDemoCloseButton = styled.span`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1/1;
    cursor: pointer;

    svg {
        font-size: 12px;
        color: ${({ theme }) => theme.colors.cardBackground};
        z-index: 1;
    }

    &:before {
        content: '';
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        position: absolute;
        background-color: ${({ theme }) => theme.colors.textLight};
        opacity: 0.4;
    }

    &:hover {
        &:before {
            background-color: ${({ theme }) => theme.colors.accent};
            opacity: 1;
        }
    }
`

export const ScaleDemoControls = styled.div`
    border-right: 1px solid ${({ theme }) => theme.colors.borderLight};

    ${media.mobile`
        & {
            border-right-width: 0;
            border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
        }
    `}
`

export const ScaleDemoChartWrapper = styled.div`
    background-color: ${({ theme }) => theme.nivo.background};
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ScaleDemoChartContainer = styled.div`
    flex: 1;
`

export const ScaleDemoConfigObject = styled(CodeBlock)`
    overflow: auto;
`
