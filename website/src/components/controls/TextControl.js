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
import TextInput from './TextInput'
import { Help } from './styled'

const TextControl = memo(({ id, property, value, onChange, options }) => {
    const handleUpdate = useCallback(event => onChange(event.target.value), [onChange])

    return (
        <Control description={property.description}>
            <PropertyHeader id={id} {...property} />
            <TextInput
                id={id}
                type="text"
                value={value}
                onChange={handleUpdate}
                disabled={options.disabled === true}
            />
            <Help>{property.help}</Help>
        </Control>
    )
})

TextControl.displayName = 'TextControl'
TextControl.propTypes = {
    id: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.shape({
        disabled: PropTypes.bool,
    }).isRequired,
}
TextControl.defaultProps = {
    options: {},
}

export default TextControl
