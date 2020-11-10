import React from 'react'
// @ts-ignore
import compose from 'recompose/compose'
// @ts-ignore
import withPropsOnChange from 'recompose/withPropsOnChange'
// @ts-ignore
import pure from 'recompose/pure'
import { BasicTooltip } from '@nivo/tooltip'
import { SunburstArcProps } from './types'

const SunburstArc = ({
    node,
    path,
    borderWidth,
    borderColor,
    showTooltip,
    hideTooltip,
    tooltip,
    onClick,
    onMouseEnter,
    onMouseLeave,
}: SunburstArcProps & {
    onClick: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void
}) => {
    // @ts-ignore
    const handleTooltip = e => showTooltip(tooltip, e)
    const handleMouseEnter = (e: React.MouseEvent<SVGPathElement, MouseEvent>) => {
        onMouseEnter?.(node.data, e)
        // @ts-ignore
        showTooltip(tooltip, e)
    }
    const handleMouseLeave = (e: React.MouseEvent<SVGPathElement, MouseEvent>) => {
        onMouseLeave?.(node.data, e)
        hideTooltip()
    }

    return (
        <path
            d={path}
            fill={node.data.color}
            stroke={borderColor}
            strokeWidth={borderWidth}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleTooltip}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        />
    )
}

const enhance = compose(
    withPropsOnChange(['node', 'arcGenerator'], ({ node, arcGenerator }: SunburstArcProps) => ({
        path: arcGenerator(node),
    })),
    withPropsOnChange(['node', 'onClick'], ({ node, onClick }: SunburstArcProps) => ({
        onClick: (event: React.MouseEvent<SVGPathElement, MouseEvent>) =>
            onClick?.(node.data, event),
    })),
    withPropsOnChange(
        ['node', 'tooltip', 'tooltipFormat'],
        ({ node, tooltip, tooltipFormat }: SunburstArcProps) => ({
            tooltip: (
                <BasicTooltip
                    id={node.data.id}
                    value={`${(node.data as any).percentage.toFixed(2)}%`}
                    enableChip={true}
                    color={node.data.color}
                    format={tooltipFormat}
                    // @ts-ignore
                    renderContent={
                        typeof tooltip === 'function' ? tooltip.bind(null, { ...node.data }) : null
                    }
                />
            ),
        })
    ),
    pure
)

export default (enhance(SunburstArc as any) as unknown) as React.FC<SunburstArcProps>
