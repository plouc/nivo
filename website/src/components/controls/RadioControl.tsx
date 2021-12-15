import React, { memo, useCallback } from 'react'
import { Control } from './Control'
import { PropertyHeader } from './PropertyHeader'
import { Help } from './Help'
import { Radio } from './Radio'

interface RadioControlProps {
    /*
    id: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired,
    flavors: PropTypes.arrayOf(PropTypes.oneOf(['svg', 'html', 'canvas', 'api'])).isRequired,
    currentFlavor: PropTypes.oneOf(['svg', 'html', 'canvas', 'api']).isRequired,
    value: PropTypes.string.isRequired,
    options: PropTypes.shape({
        choices: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
     */
}

const RadioControl = memo(({ id, property, flavors, currentFlavor, options, value, onChange }) => {
    const handleUpdate = useCallback(event => onChange(event.target.value), [onChange])

    return (
        <Control
            id={id}
            description={property.description}
            flavors={flavors}
            currentFlavor={currentFlavor}
            supportedFlavors={property.flavors}
        >
            <PropertyHeader {...property} />
            <Radio options={options.choices} value={value} onChange={handleUpdate} />
            <Help>{property.help}</Help>
        </Control>
    )
})

export default RadioControl
