import React, { useState, useCallback, PropsWithChildren } from 'react'
import intersection from 'lodash/intersection.js'
import styled from 'styled-components'
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md'
import { ChartProperty, Flavor } from '../../../types'
import { ControlContext } from '../types'
import { PropertyHeader } from './PropertyHeader'
import { Help } from './Help'
import { PropertyDescription } from './PropertyDescription'
import { PropertyFlavors } from './PropertyFlavors'
import { Cell } from './styled'

interface ControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    context?: ControlContext
}

export const Control = ({
    id,
    property,
    flavors,
    currentFlavor,
    context,
    children,
}: PropsWithChildren<ControlProps>) => {
    const [showDescription, setShowDescription] = useState(false)
    const toggle = useCallback(() => setShowDescription(flag => !flag), [setShowDescription])

    let showFlavors = false
    if (Array.isArray(property.flavors)) {
        if (intersection(flavors, property.flavors).length < flavors.length) {
            showFlavors = true
        }
    }

    let description: string | undefined = undefined
    if (typeof property.description === 'string') {
        description = property.description
    } else if (typeof property.description === 'object') {
        // If an object is provided, it means it depends on the current flavor.
        description = property.description[currentFlavor]
    }

    return (
        <Container id={id}>
            {description !== undefined && (
                <Toggle onClick={toggle}>
                    {showDescription && <MdKeyboardArrowDown size={18} />}
                    {!showDescription && <MdKeyboardArrowRight size={18} />}
                </Toggle>
            )}
            <PropertyHeader {...property} context={context} />
            {children}
            {showFlavors && (
                <PropertyFlavors flavors={flavors} supportedFlavors={property.flavors!} />
            )}
            <Help>{property.help}</Help>
            {description && showDescription && <PropertyDescription description={description} />}
        </Container>
    )
}

const Container = styled(Cell)`
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

    &:last-child {
        border-bottom-width: 0;
    }
`

const Toggle = styled.span`
    user-select: none;
    display: block;
    position: absolute;
    width: 20px;
    top: 0;
    bottom: 0;
    left: 0;
    padding-top: 11px;
    padding-left: 1px;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.borderLight};
`
