/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import ApiPreview from './ApiPreview'
import media from '../../../theming/mediaQueries'
import { useTheme } from '../../../theming/context'
import CodeBlock from '../../CodeBlock'

const tabs = ['preview', 'body', 'data']

const ApiTabs = ({ chartClass, data, body, isLoading, responseStatus, chartUrl }) => {
    const theme = useTheme()

    const [currentTab, setCurrentTab] = useState('preview')
    const [hoverTab, setHoverTab] = useState(null)

    return (
        <Wrapper className={`chart-tabs--${currentTab}`}>
            <Nav>
                {tabs.map(tab => {
                    const isCurrent = tab === currentTab
                    const icon = tab === 'preview' ? chartClass : 'data'
                    const iconColors = isCurrent || hoverTab === tab ? 'colored' : 'neutral'

                    return (
                        <NavItem
                            key={tab}
                            className="no-select"
                            isCurrent={isCurrent}
                            onClick={() => setCurrentTab(tab)}
                            onMouseEnter={() => setHoverTab(tab)}
                            onMouseLeave={() => setHoverTab(null)}
                        >
                            <Icon className={`sprite-icons-${icon}-${theme.id}-${iconColors}`} />
                            {tab}
                        </NavItem>
                    )
                })}
            </Nav>
            <Content>
                {currentTab === 'preview' && (
                    <ApiPreview
                        isLoading={isLoading}
                        responseStatus={responseStatus}
                        chartUrl={chartUrl}
                    />
                )}
                {currentTab === 'body' && <CodeBlock>{JSON.stringify(body, null, '  ')}</CodeBlock>}
                {currentTab === 'data' && <CodeBlock>{data}</CodeBlock>}
                <Loader isLoading={isLoading} />
            </Content>
        </Wrapper>
    )
}

ApiTabs.propTypes = {
    chartClass: PropTypes.string.isRequired,
    data: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
}

export default ApiTabs

const Wrapper = styled.div`
    position: fixed;
    top: ${({ theme }) => theme.dimensions.headerHeight}px;
    right: 0;
    width: 60%;
    --innerWidth: calc(100% - ${({ theme }) => theme.dimensions.miniNavWidth}px);
    width: calc(var(--innerWidth) * 0.6);
    --innerHeight: calc(100% - ${({ theme }) => theme.dimensions.headerHeight}px);
    height: calc(var(--innerHeight) * 0.55);
    z-index: 10;
    overflow: hidden;
    background: ${({ theme }) => theme.colors.cardBackground};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    ${media.tablet`
        & {
            top: ${({ theme }) => theme.dimensions.headerHeight}px;
            right: 0;
            width: 60%;
            --innerHeight: calc(100% - ${({ theme }) => theme.dimensions.headerHeight}px);
            height: calc(var(--innerHeight) * 0.55);
        }
    `}

    ${media.mobile`
        & {
            position: relative;
            top: auto;
            right: auto;
            width: auto;
            height: 460px;
            z-index: 0;
            border-top: 1px solid ${({ theme }) => theme.colors.border};
        }
    `}
`

const Nav = styled.nav`
    height: 46px;
    background: ${({ theme }) => theme.colors.background};
    display: flex;
    font-size: 15px;
    color: #aaa;
    position: relative;
`

const NavItem = styled.span`
    cursor: pointer;
    height: 46px;
    display: block;
    position: relative;
    padding-left: 46px;
    padding-right: 14px;
    padding-top: 11px;
    background: ${({ isCurrent, theme }) =>
        isCurrent ? theme.colors.cardBackground : 'transparent'};

    &:hover {
        color: ${({ theme }) => theme.colors.text};
    }
`

const Icon = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    transform: scale(0.44);
    transform-origin: top left;
    margin: 12px 0 0 12px;
`

const Content = styled.div`
    position: absolute;
    top: 46px;
    bottom: 0;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
`

const LoaderContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 80px;
    margin-top: -40px;
    margin-left: -50px;
    background: ${({ theme }) => theme.colors.cardBackground};
    display: grid;
    grid-template-columns: 10px 10px 10px 10px 10px;
    grid-column-gap: 6px;
    padding: 10px 13px;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    pointer-events: none;
    opacity: ${({ isLoading }) => (isLoading ? 1 : 0)};
    transform: translate3d(0, ${({ isLoading }) => (isLoading ? 0 : '20px')}, 0);
    transition: transform 200ms, opacity 200ms;
`

const loaderBarAnimation = keyframes`
    0%, 100% {
        transform: scale3d(1, 0, 1);
    }
    50% {
        transform: scale3d(1, 1, 1);
    }
`

const LoaderBar = styled.span`
    display: block;
    background: ${({ theme }) => theme.colors.accent};
    width: 100%;
    height: 100%;
    transform: scale3d(1, 0, 1);
    transform-origin: 100% 100%;
    animation-name: ${loaderBarAnimation};
    animation-duration: 800ms;
    animation-iteration-count: infinite;
    animation-delay: ${({ index }) => (index + 1) * 60}ms;
`

const Loader = ({ isLoading }) => {
    return (
        <LoaderContainer isLoading={isLoading}>
            <span>
                <LoaderBar index={0} />
            </span>
            <span>
                <LoaderBar index={1} />
            </span>
            <span>
                <LoaderBar index={2} />
            </span>
            <span>
                <LoaderBar index={3} />
            </span>
            <span>
                <LoaderBar index={4} />
            </span>
        </LoaderContainer>
    )
}
