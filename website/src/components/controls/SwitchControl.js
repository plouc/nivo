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
import Control from './Control'
import PropertyHeader from './PropertyHeader'
import { Help } from './styled'
import Switch from './Switch'

const SwitchControl = memo(({ id, property, value, onChange }) => {
    const handleChange = useCallback(event => onChange(event.target.checked), [onChange])

    return (
        <Control description={property.description}>
            <PropertyHeader id={id} {...property} />
            <Switch id={id} value={value} onChange={handleChange} />
            &nbsp;&nbsp;&nbsp;
            <Help>{property.help}</Help>
        </Control>
    )
})

SwitchControl.displayName = 'SwitchControl'
SwitchControl.propTypes = {
    id: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default SwitchControl
