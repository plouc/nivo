/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { BasicTooltip } from '@nivo/tooltip'

const SunburstArc = ({ node, path, borderWidth, borderColor, showTooltip, hideTooltip }) => (
    <path
        d={path}
        fill={node.data.color}
        stroke={borderColor}
        strokeWidth={borderWidth}
        onMouseEnter={showTooltip}
        onMouseMove={showTooltip}
        onMouseLeave={hideTooltip}
    />
)

SunburstArc.propTypes = {
    node: PropTypes.shape({
        data: PropTypes.shape({
            color: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    arcGenerator: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    tooltip: PropTypes.func,
    theme: PropTypes.object.isRequired,
}

const enhance = compose(
    withPropsOnChange(['node', 'arcGenerator'], ({ node, arcGenerator }) => ({
        path: arcGenerator(node),
    })),
    withPropsOnChange(
        ['node', 'showTooltip', 'tooltip', 'tooltipFormat', 'theme'],
        ({ node, showTooltip, tooltip, tooltipFormat, theme }) => ({
            showTooltip: e => {
                showTooltip(
                    <BasicTooltip
                        id={node.data.id}
                        enableChip={true}
                        color={node.data.color}
                        value={`${node.data.percentage.toFixed(2)}%`}
                        theme={theme}
                        format={tooltipFormat}
                        renderContent={
                            typeof tooltip === 'function'
                                ? tooltip.bind(null, { node, ...node })
                                : null
                        }
                    />,
                    e
                )
            },
        })
    ),
    pure
)

export default enhance(SunburstArc)
