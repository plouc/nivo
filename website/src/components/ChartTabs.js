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
        mode: PropTypes.string.isRequired,
    }

    static defaultProps = {
        mode: '',
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
        const { chartClass, mode, data, code, children, nodeCount } = this.props
        const { tab: currentTab, hoverTab } = this.state

        let content
        if (currentTab === 'chart') {
            content = children
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
            <div
                className={`chart-tabs${
                    mode.length > 0 ? ` chart-tabs--${mode}` : ''
                } chart-tabs--${currentTab}`}
            >
                {content}
                <div className="chart-tabs__menu">
                    <span
                        className={`chart-tabs__menu__helper chart-tabs__menu__helper--${currentTab}`}
                    >
                        {hoverTab}
                    </span>
                    <div className="chart-tabs__menu__wrapper">
                        {tabs.map(tab => {
                            const icon = tab === 'chart' ? chartClass : tab
                            const iconColor =
                                tab === currentTab || hoverTab === tab ? 'red' : 'grey'

                            return (
                                <span
                                    key={tab}
                                    className="chart-tabs__menu__item"
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
                                </span>
                            )
                        })}
                    </div>
                </div>
                {currentTab === 'chart' &&
                    nodeCount !== undefined && (
                        <span className="chart-tabs__node-count">
                            <strong>{nodeCount}</strong>&nbsp;nodes
                        </span>
                    )}
            </div>
        )
    }
}
