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

const tabs = ['chart', 'code', 'data']

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
            content = <div className="chart-tabs__content">{children}</div>
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
            <div className={`chart-tabs chart-tabs--${currentTab}`}>
                <div className="chart-tabs__menu">
                    {tabs.map(tab => {
                        const isCurrent = tab === currentTab
                        const icon = tab === 'chart' ? chartClass : tab
                        const iconColor = isCurrent || hoverTab === tab ? 'red' : 'grey'

                        return (
                            <span
                                key={tab}
                                className={`chart-tabs__menu__item no-select ${
                                    isCurrent ? 'chart-tabs__menu__item--current' : ''
                                }`}
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
                                <span
                                    className={`chart-tabs__menu__item__icon sprite-icons-${icon}-${iconColor}`}
                                />
                                {tab}
                            </span>
                        )
                    })}
                    {diceRoll && (
                        <span className="dice-roll no-select" onClick={diceRoll}>
                            roll the dice
                        </span>
                    )}
                </div>
                {content}
                {currentTab === 'chart' && nodeCount !== undefined && (
                    <span className="chart-tabs__node-count">
                        <strong>{nodeCount}</strong>
                        &nbsp;
                        {nodeCountWording}
                    </span>
                )}
            </div>
        )
    }
}
