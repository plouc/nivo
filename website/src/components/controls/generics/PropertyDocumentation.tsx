import React from 'react'
import { Flavor } from '../../../types'
import { ControlContext } from '../types'
import { Control, PropertyHeader, Help } from '../ui'

interface PropertyDocumentationProps {
    id: string
    property: any
    flavors: Flavor[]
    currentFlavor: Flavor
    context?: ControlContext
}

export const PropertyDocumentation = ({
    id,
    property,
    flavors,
    currentFlavor,
    context,
}: PropertyDocumentationProps) => {
    return (
        <Control
            id={id}
            description={property.description}
            flavors={flavors}
            currentFlavor={currentFlavor}
            supportedFlavors={property.flavors}
        >
            <PropertyHeader {...property} context={context} />
            <Help>{property.help}</Help>
        </Control>
    )
}
