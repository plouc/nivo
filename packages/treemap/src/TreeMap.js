/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { SvgWrapper, withContainer, useDimensions, bindDefs } from '@nivo/core'
import { TreeMapDefaultProps, TreeMapPropTypes } from './props'
import { useTreeMap } from './hooks'
import TreeMapNodes from './TreeMapNodes'

const TreeMap = ({
    data,
    identity,
    value,
    tile,
    nodeComponent,
    valueFormat,
    innerPadding,
    outerPadding,
    leavesOnly,
    width,
    height,
    margin: partialMargin,
    colors,
    colorBy,
    nodeOpacity,
    borderWidth,
    borderColor,
    defs,
    fill,
    enableLabel,
    label,
    labelTextColor,
    orientLabel,
    labelSkipSize,
    enableParentLabel,
    parentLabel,
    parentLabelSize,
    parentLabelPosition,
    parentLabelPadding,
    parentLabelTextColor,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
}) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { nodes } = useTreeMap({
        data,
        identity,
        value,
        valueFormat,
        leavesOnly,
        width: innerWidth,
        height: innerHeight,
        tile,
        innerPadding,
        outerPadding,
        colors,
        colorBy,
        nodeOpacity,
        borderColor,
        label,
        labelTextColor,
        orientLabel,
        enableParentLabel,
        parentLabel,
        parentLabelSize,
        parentLabelPosition,
        parentLabelPadding,
        parentLabelTextColor,
    })

    const boundDefs = bindDefs(defs, nodes, fill)

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} defs={boundDefs}>
            <TreeMapNodes
                nodes={nodes}
                nodeComponent={nodeComponent}
                borderWidth={borderWidth}
                enableLabel={enableLabel}
                labelSkipSize={labelSkipSize}
                enableParentLabel={enableParentLabel}
                isInteractive={isInteractive}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                tooltip={tooltip}
            />
        </SvgWrapper>
    )
}

TreeMap.propTypes = TreeMapPropTypes

const WrappedTreeMap = withContainer(TreeMap)
WrappedTreeMap.defaultProps = TreeMapDefaultProps

export default WrappedTreeMap
