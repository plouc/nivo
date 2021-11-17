import React, { useState, useCallback, ReactNode, PropsWithChildren } from 'react'
import intersection from 'lodash/intersection'
import styled from 'styled-components'
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md'
import { Flavor } from '../../types'
import PropertyDescription from './PropertyDescription'
import { PropertyFlavors } from './PropertyFlavors'
import { Cell } from './styled'

interface ControlProps {
    id: string
    description?: ReactNode
    flavors: Flavor[]
    currentFlavor: Flavor
    supportedFlavors: Flavor[]
}

export const Control = ({
    id,
    description,
    flavors,
    currentFlavor,
    supportedFlavors,
    children,
}: PropsWithChildren<ControlProps>) => {
    const [showDescription, setShowDescription] = useState(false)
    const toggle = useCallback(() => setShowDescription(flag => !flag), [setShowDescription])

    let isPropertySupported = true
    let showFlavors = false
    if (Array.isArray(supportedFlavors)) {
        if (intersection(flavors, supportedFlavors).length < flavors.length) {
            showFlavors = true
        }
        if (!supportedFlavors.includes(currentFlavor)) {
            isPropertySupported = false
        }
    }

    return (
        <Container id={id} isPropertySupported={isPropertySupported}>
            {description !== undefined && (
                <Toggle onClick={toggle}>
                    {showDescription && <MdKeyboardArrowDown size={18} />}
                    {!showDescription && <MdKeyboardArrowRight size={18} />}
                </Toggle>
            )}
            {children}
            {showFlavors && (
                <PropertyFlavors flavors={flavors} supportedFlavors={supportedFlavors} />
            )}
            {showDescription && <PropertyDescription description={description} />}
        </Container>
    )
}

const Container = styled(Cell)<{ isPropertySupported: boolean }>`
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
