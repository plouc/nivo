import { useState, useCallback, PropsWithChildren } from 'react'
// import intersection from 'lodash/intersection'
import styled from 'styled-components'
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md'
// import { Flavor } from '../../../types'
import { Description } from './Description'
// import { PropertyFlavors } from './PropertyFlavors'
// import { Cell } from './styled'

interface ControlProps {
    name: string
    description?: string
    // flavors: Flavor[]
    // currentFlavor: Flavor
    // supportedFlavors?: Flavor[]
}

export const ControlContainer = ({
    name,
    description,
    // flavors,
    // currentFlavor,
    // supportedFlavors,
    children,
}: PropsWithChildren<ControlProps>) => {
    const [showDescription, setShowDescription] = useState(false)
    const toggle = useCallback(() => setShowDescription(flag => !flag), [setShowDescription])

    let isPropertySupported = true
    // let showFlavors = false
    // if (Array.isArray(supportedFlavors)) {
    //     if (intersection(flavors, supportedFlavors).length < flavors.length) {
    //         showFlavors = true
    //     }
    //     if (!supportedFlavors.includes(currentFlavor)) {
    //         isPropertySupported = false
    //     }
    // }

    return (
        <Container id={name} isPropertySupported={isPropertySupported}>
            {description !== undefined && (
                <Toggle onClick={toggle}>
                    {showDescription && <MdKeyboardArrowDown size={18} />}
                    {!showDescription && <MdKeyboardArrowRight size={18} />}
                </Toggle>
            )}
            {children}
            {/*showFlavors && (
                <PropertyFlavors flavors={flavors} supportedFlavors={supportedFlavors!} />
            )*/}
            {description && showDescription && <Description description={description} />}
        </Container>
    )
}

const Container = styled.div<{ isPropertySupported: boolean }>`
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
    padding: 9px 9px;

    &:last-child {
        border-bottom-width: 0;
    }

    & * {
        box-sizing: border-box;
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
