/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component, Fragment } from 'react'
import partial from 'lodash.partial'
import setDisplayName from 'recompose/setDisplayName'
import { TransitionMotion, spring } from 'react-motion'
import { Container } from '@nivo/core'
import enhance from './enhance'
import { WaffleHtmlPropTypes } from './props'
import { applyDataToGrid } from './compute'
import WaffleCellTooltip from './WaffleCellTooltip'

class WaffleHtml extends Component {
    static propTypes = WaffleHtmlPropTypes

    handleCellHover = (showTooltip, cell, event) => {
        const { setCurrentCell, theme, tooltipFormat, tooltip } = this.props

        setCurrentCell(cell)

        if (!cell.data) return

        showTooltip(
            <WaffleCellTooltip
                position={cell.position}
                row={cell.row}
                column={cell.column}
                color={cell.color}
                data={cell.data}
                theme={theme}
                tooltipFormat={tooltipFormat}
                tooltip={tooltip}
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
            cellComponent,
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
            <Container
                isInteractive={isInteractive}
                theme={theme}
                animate={animate}
                motionDamping={motionDamping}
                motionStiffness={motionStiffness}
            >
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
                                            {computedCells.map(cell =>
                                                React.createElement(cellComponent, {
                                                    key: cell.position,
                                                    position: cell.position,
                                                    size: cellSize,
                                                    x: cell.x,
                                                    y: cell.y,
                                                    color: cell.color,
                                                    fill: cell.data && cell.data.fill,
                                                    opacity: cell.data ? 1 : emptyOpacity,
                                                    borderWidth,
                                                    borderColor: getBorderColor(cell),
                                                    data: cell.data,
                                                    onHover: partial(onHover, cell),
                                                    onLeave,
                                                    onClick,
                                                })
                                            )}
                                        </Fragment>
                                    )
                                }}
                            </TransitionMotion>
                        )
                    } else {
                        const computedCells = applyDataToGrid(cells, computedData)

                        cellsRender = (
                            <Fragment>
                                {computedCells.map(cell =>
                                    React.createElement(cellComponent, {
                                        key: cell.position,
                                        position: cell.position,
                                        size: cellSize,
                                        x: cell.x,
                                        y: cell.y,
                                        color: cell.color,
                                        fill: cell.data && cell.data.fill,
                                        opacity: cell.data ? 1 : emptyOpacity,
                                        borderWidth,
                                        borderColor: getBorderColor(cell),
                                        data: cell.data,
                                        onHover: partial(onHover, cell),
                                        onLeave,
                                        onClick,
                                    })
                                )}
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

export default setDisplayName(WaffleHtml.displayName)(enhance(WaffleHtml))
