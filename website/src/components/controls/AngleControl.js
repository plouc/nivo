/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Control from './Control'
import PropertyHeader from './PropertyHeader'
import TextInput from './TextInput'
import { Help } from './styled'

const size = 36
const center = size / 2
const markerSize = 6

const Row = styled.div`
    display: grid;
    grid-template-columns: 60px ${size}px auto;
    grid-column-gap: 9px;
    align-items: center;
    max-width: 240px;
    margin-bottom: 5px;
`

const Circle = styled.circle`
    fill: ${({ theme }) => theme.colors.background};
    strokewidth: 1px;
    stroke: ${({ theme }) => theme.colors.border};
`

const Line = styled.line`
    stroke: ${({ theme }) => theme.colors.accent};
`

const Marker = styled.circle`
    fill: ${({ theme }) => theme.colors.accent};
`

const AngleControl = memo(({ id, property, flavors, currentFlavor, value, options, onChange }) => {
    const start = options.start || 0
    const min = options.min || 0
    const max = options.max || 360

    const handleChange = useCallback(
        event => {
            onChange(Number(event.target.value))
        },
        [onChange]
    )

    return (
        <Control
            id={id}
            description={property.description}
            flavors={flavors}
            currentFlavor={currentFlavor}
            supportedFlavors={property.flavors}
        >
            <PropertyHeader id={id} {...property} />
            <Row>
                <TextInput id={id} value={value} onChange={handleChange} unit="°" isNumber={true} />
                <svg width={size} height={size}>
                    <Circle cx={center} cy={center} r={center - markerSize / 2} />
                    <g transform={`translate(${center},${center})`}>
                        <g transform={`rotate(${start + value})`}>
                            <Line y2={-size / 2 + markerSize / 2} />
                            <Marker r={markerSize / 4} />
                            <Marker cy={-size / 2 + markerSize / 2} r={markerSize / 2} />
                        </g>
                    </g>
                </svg>
                <input type="range" value={value} onChange={handleChange} min={min} max={max} />
            </Row>
            <Help>{property.help}</Help>
        </Control>
    )
})

AngleControl.propTypes = {
    id: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired,
    flavors: PropTypes.arrayOf(PropTypes.oneOf(['svg', 'html', 'canvas', 'api'])).isRequired,
    currentFlavor: PropTypes.oneOf(['svg', 'html', 'canvas', 'api']).isRequired,
    value: PropTypes.number.isRequired,
    options: PropTypes.shape({
        start: PropTypes.number,
        min: PropTypes.number,
        max: PropTypes.number,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
}

export default AngleControl
