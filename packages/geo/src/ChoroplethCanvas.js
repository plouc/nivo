/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ChoroplethCanvasPropTypes, ChoroplethCanvasDefaultProps } from './props'
import GeoMapCanvas from './GeoMapCanvas'
import { useChoropleth } from './hooks'

const ChoroplethCanvas = props => {
    const { getFillColor, boundFeatures } = useChoropleth(props)

    return <GeoMapCanvas {...props} features={boundFeatures} fillColor={getFillColor} />
}

ChoroplethCanvas.propTypes = ChoroplethCanvasPropTypes
ChoroplethCanvas.defaultProps = ChoroplethCanvasDefaultProps

export default ChoroplethCanvas
