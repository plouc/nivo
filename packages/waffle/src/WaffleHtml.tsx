import { createElement, Fragment, ReactNode } from 'react'
// @ts-ignore
import { withContainer, useDimensions } from '@nivo/core'
import { Datum, DefaultRawDatum, HtmlProps, HtmlLayerId } from './types'
import { defaultProps } from './props'
import { useWaffle, useMergeCellsData } from './hooks'

const WaffleHtml = <RawDatum extends Datum = DefaultRawDatum>({
    width,
    height,
    margin: partialMargin,
    data,
    total,
    rows,
    columns,
    fillDirection = defaultProps.fillDirection,
    padding = defaultProps.padding,
    layers = ['cells'],
    colors = defaultProps.colors,
    emptyColor = defaultProps.emptyColor,
    // emptyOpacity = defaultProps.emptyOpacity,
    borderWidth = defaultProps.borderWidth,
    borderColor = defaultProps.borderColor,
    // isInteractive = defaultProps.isInteractive,
    role = defaultProps.role,
}: HtmlProps<RawDatum>) => {
    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { grid, computedData, getBorderColor } = useWaffle<RawDatum>({
        width: innerWidth,
        height: innerHeight,
        data,
        total,
        rows,
        columns,
        fillDirection,
        padding,
        colors,
        emptyColor,
        borderColor,
    })

    const mergedCells = useMergeCellsData<RawDatum>(grid.cells, computedData)

    const layerById: Record<HtmlLayerId, ReactNode> = {
        cells: null,
    }

    if (layers.includes('cells')) {
        layerById.cells = (
            <div
                key="cells"
                style={{
                    position: 'absolute',
                    top: margin.top + grid.origin.y,
                    left: margin.left + grid.origin.x,
                }}
            >
                {mergedCells.map(cell => {
                    return (
                        <div
                            key={cell.position}
                            style={{
                                position: 'absolute',
                                top: cell.y,
                                left: cell.x,
                                width: grid.cellSize,
                                height: grid.cellSize,
                                background: cell.color,
                                // opacity: ,
                                boxSizing: 'content-box',
                                borderStyle: 'solid',
                                borderWidth: `${borderWidth}px`,
                                borderColor: getBorderColor(cell),
                            }}
                        />
                    )
                })}
            </div>
        )
    }

    return (
        <div
            style={{
                position: 'relative',
                width: outerWidth,
                height: outerHeight,
            }}
            role={role}
        >
            {layers.map((layer, i) => {
                if (layerById[layer as HtmlLayerId] !== undefined) {
                    return layerById[layer as HtmlLayerId]
                }

                if (typeof layer === 'function') {
                    return <Fragment key={i}>{createElement(layer)}</Fragment>
                }

                return null
            })}
        </div>
    )
}

export default withContainer(WaffleHtml) as <RawDatum extends Datum = DefaultRawDatum>(
    props: HtmlProps<RawDatum>
) => JSX.Element

/*
import React, { Component, Fragment } from 'react'
import partial from 'lodash.partial'
import setDisplayName from 'recompose/setDisplayName'
import { TransitionMotion, spring } from 'react-motion'
import { LegacyContainer } from '@nivo/core'
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
            <LegacyContainer
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
                                                createElement(cellComponent, {
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
                                    createElement(cellComponent, {
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
            </LegacyContainer>
        )
    }
}

WaffleHtml.displayName = 'WaffleHtml'

export default setDisplayName(WaffleHtml.displayName)(enhance(WaffleHtml))
 */
