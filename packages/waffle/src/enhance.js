/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import withState from 'recompose/withState'
import pure from 'recompose/pure'
import { withDimensions, withTheme, withMotion, bindDefs } from '@nivo/core'
import { getOrdinalColorScale, getInheritedColorGenerator } from '@nivo/colors'
import * as props from './props'
import { computeGrid } from './compute'

const commonEnhancers = [
    withDimensions(),
    withTheme(),
    withMotion(),
    withPropsOnChange(['colors'], ({ colors }) => ({
        getColor: getOrdinalColorScale(colors, 'id'),
    })),
    withPropsOnChange(['borderColor', 'theme'], ({ borderColor, theme }) => ({
        getBorderColor: getInheritedColorGenerator(borderColor, theme),
    })),
    withState('currentCell', 'setCurrentCell', null),
    withPropsOnChange(['rows', 'columns', 'total'], ({ rows, columns, total }) => ({
        unit: total / (rows * columns),
    })),
    withPropsOnChange(
        ['width', 'height', 'rows', 'columns', 'fillDirection', 'padding'],
        ({ width, height, rows, columns, fillDirection, padding }) => {
            return computeGrid(width, height, rows, columns, fillDirection, padding)
        }
    ),
    withPropsOnChange(
        ['data', 'unit', 'getColor', 'hiddenIds'],
        ({ data, unit, getColor, hiddenIds }) => {
            let currentPosition = 0

            return {
                computedData: data.map((datum, groupIndex) => {
                    if (!hiddenIds.includes(datum.id)) {
                        const enhancedDatum = {
                            ...datum,
                            groupIndex,
                            startAt: currentPosition,
                            endAt: currentPosition + Math.round(datum.value / unit),
                            color: getColor(datum),
                        }

                        currentPosition = enhancedDatum.endAt

                        return enhancedDatum
                    }

                    return {
                        ...datum,
                        groupIndex,
                        startAt: currentPosition,
                        endAt: currentPosition,
                        color: getColor(datum),
                    }
                }),
            }
        }
    ),
    withPropsOnChange(['computedData'], ({ computedData }) => ({
        legendData: computedData.map(datum => ({
            id: datum.id,
            label: datum.id,
            color: datum.color,
            fill: datum.fill,
        })),
    })),
]

export default Component => {
    const implDefaultProps = props[`${Component.displayName}DefaultProps`]

    switch (Component.displayName) {
        case 'Waffle':
            return compose(
                ...[
                    defaultProps(implDefaultProps),
                    ...commonEnhancers,
                    withMotion(),
                    withPropsOnChange(
                        ['computedData', 'defs', 'fill'],
                        ({ computedData, defs, fill }) => ({
                            defs: bindDefs(defs, computedData, fill, { targetKey: 'fill' }),
                        })
                    ),
                    pure,
                ]
            )(Component)

        case 'WaffleHtml':
            return compose(
                ...[defaultProps(implDefaultProps), ...commonEnhancers, withMotion(), pure]
            )(Component)

        case 'WaffleCanvas':
            return compose(...[defaultProps(implDefaultProps), ...commonEnhancers, pure])(Component)
    }

    return Component
}
