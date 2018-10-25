/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const tabs = ['chart', 'code', 'data']

// .chart-tabs
const Wrapper = styled.div`
    width: 100%;
    position: relative;
    overflow: hidden;
    height: 510px;
    margin-bottom: 40px;
    background: ${({ theme }) => theme.colors.cardBackground};
    box-shadow: ${({ theme }) => theme.topCardShadow};
`

const Nav = styled.nav`
    height: 46px;
    background: ${({ theme }) => theme.colors.background};
    display: flex;
    font-size: 15px;
    color: #aaa;
    position: relative;
`

// .chart-tabs__menu__item
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

// .chart-tabs__menu__item__icon
const Icon = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    transform-origin: top left;
    margin: 12px 0 0 12px;
    width: 22px;
    height: 22px;
`

const Content = styled.div`
    position: absolute;
    top: 46px;
    bottom: 0;
    width: 100%;
`

const DiceRollButton = styled.span`
    position: absolute;
    top: 7px;
    right: 10px;
    display: block;
    padding: 8px 10px;
    height: 32px;
    line-height: 1em;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.cardBackground};
    color: ${({ theme }) => theme.colors.accent};
    cursor: pointer;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.12);
    font-weight: 600;
    font-size: 15px;
    white-space: pre;

    &:hover {
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
        color: ${({ theme }) => theme.colors.accentDark};
    }
`

export default class ChartTabs extends Component {
    static propTypes = {
        chartClass: PropTypes.string.isRequired,
        data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        code: PropTypes.string.isRequired,
        nodeCount: PropTypes.number,
        nodeCountWording: PropTypes.string.isRequired,
        diceRoll: PropTypes.func,
    }

    static defaultProps = {
        mode: '',
        nodeCountWording: 'nodes',
    }

    state = {
        tab: 'chart',
        hoverTab: null,
    }

    handleTabToggle = tab => {
        this.setState({ tab })
    }

    handleTabHover = hoverTab => {
        this.setState({ hoverTab })
    }

    render() {
        const {
            chartClass,
            data,
            code,
            children,
            diceRoll,
            nodeCount,
            nodeCountWording,
        } = this.props
        const { tab: currentTab, hoverTab } = this.state

        let content
        if (currentTab === 'chart') {
            content = <Content>{children}</Content>
        } else if (currentTab === 'code') {
            content = (
                <div className="code-snippet">
                    <pre>{code}</pre>
                </div>
            )
        } else if (currentTab === 'data') {
            content = (
                <div className="json-data_json code-snippet">
                    <pre>{JSON.stringify(data, null, '  ')}</pre>
                </div>
            )
        }

        return (
            <Wrapper className={`chart-tabs chart-tabs--${currentTab}`}>
                <Nav>
                    {tabs.map(tab => {
                        const isCurrent = tab === currentTab
                        const icon = tab === 'chart' ? chartClass : tab
                        const iconColor = isCurrent || hoverTab === tab ? 'red' : 'grey'

                        return (
                            <NavItem
                                key={tab}
                                isCurrent={isCurrent}
                                className="no-select"
                                onClick={() => {
                                    this.handleTabToggle(tab)
                                }}
                                onMouseEnter={() => {
                                    this.handleTabHover(tab)
                                }}
                                onMouseLeave={() => {
                                    this.handleTabHover(null)
                                }}
                            >
                                <Icon className={`chart-icon-${icon}-${iconColor}`} />
                                {tab}
                            </NavItem>
                        )
                    })}
                    {diceRoll && (
                        <DiceRollButton className="no-select" onClick={diceRoll}>
                            roll the dice
                        </DiceRollButton>
                    )}
                </Nav>
                {content}
                {currentTab === 'chart' &&
                    nodeCount !== undefined && (
                        <span className="chart-tabs__node-count">
                            <strong>{nodeCount}</strong>
                            &nbsp;
                            {nodeCountWording}
                        </span>
                    )}
            </Wrapper>
        )
    }
}
