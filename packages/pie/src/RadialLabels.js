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
import { datumWithArcPropType, PiePropTypes } from './props'
import { usePieRadialLabels } from './hooks'
import { RadialLabel } from './RadialLabel'

export const RadialLabels = ({
    dataWithArc,
    label,
    radius,
    skipAngle,
    linkOffset,
    linkDiagonalLength,
    linkHorizontalLength,
    linkStrokeWidth,
    textXOffset,
    textColor,
    linkColor,
}) => {
    const radialLabels = usePieRadialLabels({
        enable: true,
        dataWithArc,
        label,
        textXOffset,
        textColor,
        radius,
        skipAngle,
        linkOffset,
        linkDiagonalLength,
        linkHorizontalLength,
        linkColor,
    })

    return radialLabels.map(label => (
        <RadialLabel key={label.datum.id} label={label} linkStrokeWidth={linkStrokeWidth} />
    ))
}

RadialLabels.propTypes = {
    dataWithArc: PropTypes.arrayOf(datumWithArcPropType).isRequired,
    label: PiePropTypes.radialLabel,
    skipAngle: PiePropTypes.radialLabelsSkipAngle,
    radius: PropTypes.number.isRequired,
    linkOffset: PiePropTypes.radialLabelsLinkOffset,
    linkDiagonalLength: PiePropTypes.radialLabelsLinkDiagonalLength,
    linkHorizontalLength: PiePropTypes.radialLabelsLinkHorizontalLength,
    linkStrokeWidth: PiePropTypes.radialLabelsLinkStrokeWidth,
    textXOffset: PiePropTypes.radialLabelsTextXOffset,
    textColor: PiePropTypes.radialLabelsTextColor,
    linkColor: PiePropTypes.radialLabelsLinkColor,
}
