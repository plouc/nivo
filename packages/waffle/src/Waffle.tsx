import { createElement, Fragment, ReactNode } from 'react'
// @ts-ignore
import { SvgWrapper, withContainer, useDimensions } from '@nivo/core'
import { BoxLegendSvg } from '@nivo/legends'
import { Datum, DefaultRawDatum, SvgProps, LayerId } from './types'
import { defaultProps } from './props'
import { useWaffle, useMergeCellsData } from './hooks'

const Waffle = <RawDatum extends Datum = DefaultRawDatum>({
    width,
    height,
    margin: partialMargin,
    data,
    total,
    rows,
    columns,
    fillDirection = defaultProps.fillDirection,
    padding = defaultProps.padding,
    layers = ['cells', 'legends'],
    colors = defaultProps.colors,
    emptyColor = defaultProps.emptyColor,
    // emptyOpacity = defaultProps.emptyOpacity,
    borderWidth = defaultProps.borderWidth,
    borderColor = defaultProps.borderColor,
    // defs = defaultProps.defs,
    // fill = defaultProps.fill,
    // isInteractive = defaultProps.isInteractive,
    legends = defaultProps.legends,
    role = defaultProps.role,
}: SvgProps<RawDatum>) => {
    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { grid, computedData, legendData, getBorderColor } = useWaffle<RawDatum>({
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

    const layerById: Record<LayerId, ReactNode> = {
        cells: null,
        legends: null,
    }

    if (layers.includes('cells')) {
        layerById.cells = (
            <g key="cells" transform={`translate(${grid.origin.x}, ${grid.origin.y})`}>
                {mergedCells.map(cell => {
                    return (
                        <rect
                            key={cell.position}
                            x={cell.x}
                            y={cell.y}
                            width={grid.cellSize}
                            height={grid.cellSize}
                            fill={cell.color}
                            stroke={getBorderColor(cell)}
                            strokeWidth={borderWidth}
                        />
                    )
                })}
            </g>
        )
    }

    if (layers.includes('legends')) {
        layerById.legends = (
            <g key="legends">
                {legends.map((legend, i) => (
                    <BoxLegendSvg
                        key={i}
                        {...legend}
                        containerWidth={width}
                        containerHeight={height}
                        data={legendData}
                    />
                ))}
            </g>
        )
    }

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            //defs={boundDefs}
            role={role}
        >
            {layers.map((layer, i) => {
                if (layerById[layer as LayerId] !== undefined) {
                    return layerById[layer as LayerId]
                }

                if (typeof layer === 'function') {
                    return <Fragment key={i}>{createElement(layer)}</Fragment>
                }

                return null
            })}
        </SvgWrapper>
    )
}

export default withContainer(Waffle) as <RawDatum extends Datum = DefaultRawDatum>(
    props: SvgProps<RawDatum>
) => JSX.Element

/*
export class Waffle extends Component {
    static propTypes = WafflePropTypes

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
            hiddenIds,

            // dimensions
            margin,
            width,
            height,
            outerWidth,
            outerHeight,

            // styling
            cellComponent,
            emptyColor,
            emptyOpacity,
            borderWidth,
            getBorderColor,
            theme,
            defs,

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
            legendData,

            legends,
            role,
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
                                        })),
                                        hiddenIds
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
                        const computedCells = applyDataToGrid(cells, computedData, hiddenIds)

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
                        <SvgWrapper
                            width={outerWidth}
                            height={outerHeight}
                            margin={margin}
                            defs={defs}
                            theme={theme}
                            role={role}
                        >
                            <g transform={`translate(${origin.x}, ${origin.y})`}>{cellsRender}</g>
                            {legends.map((legend, i) => (
                                <BoxLegendSvg
                                    key={i}
                                    {...legend}
                                    containerWidth={width}
                                    containerHeight={height}
                                    data={legendData}
                                    theme={theme}
                                />
                            ))}
                        </SvgWrapper>
                    )
                }}
            </LegacyContainer>
        )
    }
}
*/
