/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ChoroplethCanvasPropTypes } from './props'
import GeoMapCanvas from './GeoMapCanvas'
import { enhanceChoropleth } from './enhance'

const ChoroplethCanvas = props => <GeoMapCanvas {...props} />

ChoroplethCanvas.propTypes = ChoroplethCanvasPropTypes

ChoroplethCanvas.displayName = 'ChoroplethCanvas'

export default enhanceChoropleth(ChoroplethCanvas)
