import React from 'react'
import { ChartProperty, Flavor } from '../../../types'
import { ControlContext } from '../types'
import { Control } from '../ui'

interface PropertyDocumentationProps {
    id: string
    property: ChartProperty
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
            property={property}
            flavors={flavors}
            currentFlavor={currentFlavor}
            context={context}
        />
    )
}
