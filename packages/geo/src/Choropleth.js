/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ChoroplethPropTypes, ChoroplethDefaultProps } from './props'
import GeoMap from './GeoMap'
import { useChoropleth } from './hooks'

const Choropleth = props => {
    const { getFillColor, boundFeatures } = useChoropleth(props)

    return <GeoMap {...props} features={boundFeatures} fillColor={getFillColor} />
}

Choropleth.propTypes = ChoroplethPropTypes
Choropleth.defaultProps = ChoroplethDefaultProps

export default Choropleth
