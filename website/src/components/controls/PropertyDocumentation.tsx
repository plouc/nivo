import React from 'react'
import { Control } from './Control'
import { PropertyHeader } from './PropertyHeader'
import { Help } from './Help'
import { Flavor } from '../../types'

interface PropertyDocumentationProps {
    id: string
    property: any
    flavors: Flavor[]
    currentFlavor: Flavor
}

const PropertyDocumentation = ({
    id,
    property,
    flavors,
    currentFlavor,
}: PropertyDocumentationProps) => {
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

export default PropertyDocumentation
