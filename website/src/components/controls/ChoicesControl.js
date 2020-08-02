import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import Control from './Control'
import Select from './Select'
import PropertyHeader from './PropertyHeader'
import { Help } from './styled'

const ChoicesControl = memo(
    ({ id, property, flavors, currentFlavor, value: _value, options, onChange }) => {
        const handleUpdate = useCallback(value => onChange(value.value), [onChange])
        const value = options.choices.find(({ value: v }) => v === _value)

        return (
            <Control
                id={id}
                description={property.description}
                flavors={flavors}
                currentFlavor={currentFlavor}
                supportedFlavors={property.flavors}
            >
                <PropertyHeader id={id} {...property} />
                <Select options={options.choices} value={value} onChange={handleUpdate} />
                <Help>{property.help}</Help>
            </Control>
        )
    }
)

ChoicesControl.displayName = 'ChoicesControl'
ChoicesControl.propTypes = {
    id: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired,
    flavors: PropTypes.arrayOf(PropTypes.oneOf(['svg', 'html', 'canvas', 'api'])).isRequired,
    currentFlavor: PropTypes.oneOf(['svg', 'html', 'canvas', 'api']).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
    onChange: PropTypes.func.isRequired,
}

export default ChoicesControl
