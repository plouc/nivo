import React from 'react'
import PropTypes from 'prop-types'
import { Control } from './Control'
import { PropertyHeader } from './PropertyHeader'
import { Help } from './Help'

const PropertyDocumentation = ({ id, property, flavors, currentFlavor }) => {
    return (
        <Control
            id={id}
            description={property.description}
            flavors={flavors}
            currentFlavor={currentFlavor}
            supportedFlavors={property.flavors}
        >
            <PropertyHeader {...property} />
            <Help>{property.help}</Help>
        </Control>
    )
}

PropertyDocumentation.propTypes = {
    id: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired,
    flavors: PropTypes.arrayOf(PropTypes.oneOf(['svg', 'html', 'canvas', 'api'])).isRequired,
    currentFlavor: PropTypes.oneOf(['svg', 'html', 'canvas', 'api']).isRequired,
}

export default PropertyDocumentation
