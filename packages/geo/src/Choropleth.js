/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { ChoroplethPropTypes } from './props'
import GeoMap from './GeoMap'
import { enhanceChoropleth } from './enhance'

class Choropleth extends Component {
    static propTypes = ChoroplethPropTypes

    render() {
        const {} = this.props

        return <GeoMap {...this.props} />
    }
}

Choropleth.displayName = 'Choropleth'

export default enhanceChoropleth(Choropleth)
