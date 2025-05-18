import { useState, useCallback, PropsWithChildren } from 'react'
// import intersection from 'lodash/intersection.js'
import styled from 'styled-components'
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md'
import { ControlDescription } from './ControlDescription'
// import { ControlFlavors } from './ControlFlavors'
import { ChartProperty, ControlContext } from '../types'

interface ControlProps {
    property: ChartProperty<any>
    context?: ControlContext
}

export const Control = ({ property, context, children }: PropsWithChildren<ControlProps>) => {
    const [showDescription, setShowDescription] = useState(false)
    const toggle = useCallback(() => setShowDescription(flag => !flag), [setShowDescription])

    // Only show the flavors if the current property doesn't apply for all flavors.
    // let showFlavors = false
    // if (Array.isArray(property.flavors)) {
    //     if (intersection(flavors, supportedFlavors).length < flavors.length) {
    //         showFlavors = true
    //     }
    // }

    let description: string | undefined = undefined
    if (typeof property.description === 'string') {
        description = property.description
    } else if (typeof property.description === 'object' && context?.currentFlavor) {
        // If an object is provided, it means it depends on the current flavor.
        description = property.description[context.currentFlavor]
    }

    return (
        <Container>
            {description !== undefined && (
                <Toggle onClick={toggle}>
                    {showDescription && <MdKeyboardArrowDown size={18} />}
                    {!showDescription && <MdKeyboardArrowRight size={18} />}
                </Toggle>
            )}
            {children}
            {/*showFlavors && (
                <ControlFlavors flavors={flavors} supportedFlavors={supportedFlavors!} />
            )*/}
            {description && showDescription && <ControlDescription description={description} />}
        </Container>
    )
}

/*
${media.desktopLarge`
    & {
        padding: 14px 40px;
    }
`}

${media.desktop`
    & {
        padding: 14px 30px;
    }
`}

${media.tablet`
    & {
        padding: 14px 20px 14px 30px;
    }
`}

${media.mobile`
    & {
        padding: 14px 20px 14px 30px;
    }
`}
 */
const Container = styled.div`
    position: relative;
    font-size: 0.9rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding: ${({ theme }) => theme.spacing[5]} ${({ theme }) => theme.spacing[6]};

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
