/*
 * This file is part of the nivo project.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import _ from 'lodash'
import Nivo from '../../../Nivo'
import RadialStackD3Svg from '../../../lib/charts/radial-stack/RadialStackD3Svg'
import decoratorsFromReactChildren from '../../../lib/decoratorsFromReactChildren'
import { margin as marginPropType } from '../../../PropTypes'

const RADIAL_STACK_DECORATOR = 'decorateRadialStack'

class RadialStack extends Component {
    shouldComponentUpdate(nextProps) {
        this.radialStack.decorate(
            decoratorsFromReactChildren(
                nextProps.children,
                RADIAL_STACK_DECORATOR
            )
        )
        this.radialStack.draw(
            _.assign({}, nextProps, {
                margin: _.assign({}, Nivo.defaults.margin, nextProps.margin),
            })
        )

        return false
    }

    componentDidMount() {
        this.radialStack = RadialStackD3Svg(findDOMNode(this))
        this.radialStack.decorate(
            decoratorsFromReactChildren(
                this.props.children,
                RADIAL_STACK_DECORATOR
            )
        )
        this.radialStack.draw(
            _.assign({}, this.props, {
                margin: _.assign({}, Nivo.defaults.margin, this.props.margin),
            })
        )
    }

    render() {
        return <svg className="nivo_radial-stack" />
    }
}

const { array, number, string, func, any, oneOf } = PropTypes

RadialStack.propTypes = {
    width: number.isRequired,
    height: number.isRequired,
    margin: marginPropType,
    innerRadius: number.isRequired,
    sort: func,
    layers: array.isRequired,
    offset: oneOf(['silhouette', 'wiggle', 'expand', 'zero']).isRequired,
    keyProp: string.isRequired,
    valueProp: string.isRequired,
    colors: any.isRequired,
    transitionDuration: number.isRequired,
    transitionEasing: string.isRequired,
}

RadialStack.defaultProps = {
    margin: Nivo.defaults.margin,
    innerRadius: 0.6,
    sort: null,
    offset: 'zero',
    keyProp: 'label',
    valueProp: 'value',
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing: Nivo.defaults.transitionEasing,
    colors: Nivo.defaults.colorRange,
}

export default RadialStack
