'use client'
import { useState, useCallback, PropsWithChildren } from 'react'
import intersection from 'lodash/intersection.js'
import { Flavor, FlavorAwareChartPropertyAttribute} from "@/types/charts";
// import { PropertyDescription } from './PropertyDescription'
// import { PropertyFlavors } from './PropertyFlavors'
import styles from './Control.module.css'

interface ControlProps {
    id: string
    description?: FlavorAwareChartPropertyAttribute<string>
    flavors: Flavor[]
    currentFlavor: Flavor
    supportedFlavors?: Flavor[]
}

export const Control = ({
    id,
    description: _description,
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

    let description: string | undefined = undefined
    if (typeof _description === 'string') {
        description = _description
    } else if (typeof _description === 'object') {
        // If an object is provided, it means it depends on the current flavor.
        description = _description[currentFlavor]
    }

    return (
        <div className={styles.control} id={id}>
            {/*description !== undefined && (
                <Toggle onClick={toggle}>
                    {showDescription && <MdKeyboardArrowDown size={18} />}
                    {!showDescription && <MdKeyboardArrowRight size={18} />}
                </Toggle>
            )*/}
            {children}
            {/*showFlavors && (
                <PropertyFlavors flavors={flavors} supportedFlavors={supportedFlavors!} />
            )*/}
            <div>{description}</div>
            {/*description && showDescription && <PropertyDescription description={description} />*/}
        </div>
    )
}

/*
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
*/
