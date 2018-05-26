/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component, Fragment } from 'react'
import partial from 'lodash/partial'
import { TransitionMotion, spring } from 'react-motion'
import { Container, BasicTooltip } from '@nivo/core'
import enhance from './enhance'
import { WafflePropTypes } from './props'
import { applyDataToGrid } from './compute'

class WaffleHtml extends Component {
    static propTypes = WafflePropTypes

    handleCellHover = (showTooltip, cell, event) => {
        const { setCurrentCell, theme, tooltipFormat, tooltip } = this.props

        setCurrentCell(cell)

        if (!cell.data) return

        showTooltip(
            <BasicTooltip
                id={cell.data.label}
                value={cell.data.value}
                enableChip={true}
                color={cell.color}
                theme={theme}
                format={tooltipFormat}
                renderContent={
                    typeof tooltip === 'function'
                        ? tooltip.bind(null, { color: cell.color, ...cell.data })
                        : null
                }
            />,
            event
        )
    }

    handleCellLeave = hideTooltip => {
        this.props.setCurrentCell(null)
        hideTooltip()
    }

    render() {
        const {
            // dimensions
            margin,
            outerWidth,
            outerHeight,

            // styling
            emptyColor,
            emptyOpacity,
            borderWidth,
            getBorderColor,
            theme,

            // motion
            animate,
            motionStiffness,
            motionDamping,

            // interactivity
            isInteractive,
            onClick,

            // computed
            cells,
            cellSize,
            origin,
            computedData,
        } = this.props

        cells.forEach(cell => {
            cell.color = emptyColor
        })

        return (
            <Container isInteractive={isInteractive} theme={theme}>
                {({ showTooltip, hideTooltip }) => {
                    const onHover = partial(this.handleCellHover, showTooltip)
                    const onLeave = partial(this.handleCellLeave, hideTooltip)

                    let cellsRender
                    if (animate === true) {
                        const springConfig = {
                            stiffness: motionStiffness,
                            damping: motionDamping,
                        }

                        cellsRender = (
                            <TransitionMotion
                                styles={computedData.map(datum => ({
                                    key: datum.id,
                                    data: datum,
                                    style: {
                                        startAt: spring(datum.startAt, springConfig),
                                        endAt: spring(datum.endAt, springConfig),
                                    },
                                }))}
                            >
                                {interpolatedStyles => {
                                    const computedCells = applyDataToGrid(
                                        cells,
                                        interpolatedStyles.map(s => ({
                                            ...s.data,
                                            startAt: Math.round(s.style.startAt),
                                            endAt: Math.round(s.style.endAt),
                                        }))
                                    )

                                    return (
                                        <Fragment>
                                            {computedCells.map(cell => (
                                                <div
                                                    key={cell.position}
                                                    style={{
                                                        position: 'absolute',
                                                        top: cell.y,
                                                        left: cell.x,
                                                        width: cellSize,
                                                        height: cellSize,
                                                        background: cell.color,
                                                        opacity: cell.data ? 1 : emptyOpacity,
                                                        borderWidth,
                                                        borderColor: getBorderColor(cell),
                                                    }}
                                                    onMouseEnter={partial(onHover, cell)}
                                                    onMouseMove={partial(onHover, cell)}
                                                    onMouseLeave={onLeave}
                                                    onClick={e => {
                                                        onClick(cell, e)
                                                    }}
                                                />
                                            ))}
                                        </Fragment>
                                    )
                                }}
                            </TransitionMotion>
                        )
                    } else {
                        const computedCells = applyDataToGrid(cells, computedData)

                        cellsRender = (
                            <Fragment>
                                {computedCells.map(cell => (
                                    <div
                                        key={cell.position}
                                        style={{
                                            position: 'absolute',
                                            top: cell.y,
                                            left: cell.x,
                                            width: cellSize,
                                            height: cellSize,
                                            background: cell.color,
                                            opacity: cell.data ? 1 : emptyOpacity,
                                            borderWidth,
                                            borderColor: getBorderColor(cell),
                                        }}
                                        onMouseEnter={partial(onHover, cell)}
                                        onMouseMove={partial(onHover, cell)}
                                        onMouseLeave={onLeave}
                                        onClick={e => {
                                            onClick(cell, e)
                                        }}
                                    />
                                ))}
                            </Fragment>
                        )
                    }

                    return (
                        <div
                            style={{
                                position: 'relative',
                                width: outerWidth,
                                height: outerHeight,
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: margin.top + origin.y,
                                    left: margin.left + origin.x,
                                }}
                            >
                                {cellsRender}
                            </div>
                        </div>
                    )
                }}
            </Container>
        )
    }
}

WaffleHtml.displayName = 'WaffleHtml'

export default enhance(WaffleHtml)
