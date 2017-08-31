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
import withState from 'recompose/withState'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { arc as d3Arc } from 'd3-shape'
import { chord as d3Chord, ribbon as d3Ribbon } from 'd3-chord'
import { withMotion, withTheme, withDimensions } from '../../../hocs'
import { ChordDefaultProps } from './props'

export default Component =>
    compose(
        defaultProps(ChordDefaultProps),
        withState('currentArc', 'setCurrentArc', null),
        withState('currentRibbon', 'setCurrentRibbon', null),
        withMotion(),
        withTheme(),
        withDimensions(),
        withPropsOnChange(['padAngle'], ({ padAngle }) => ({
            chord: d3Chord().padAngle(padAngle),
        })),
        withPropsOnChange(
            ['width', 'height', 'innerRadiusRatio', 'innerRadiusOffset'],
            ({ width, height, innerRadiusRatio, innerRadiusOffset }) => {
                const radius = Math.min(width, height) / 2
                const ribbonRadius = radius * (innerRadiusRatio - innerRadiusOffset)

                const arcGenerator = d3Arc()
                    .outerRadius(radius)
                    .innerRadius(radius * innerRadiusRatio)
                const ribbonGenerator = d3Ribbon().radius(ribbonRadius)

                return { radius, arcGenerator, ribbonGenerator }
            }
        ),
        pure
    )(Component)
