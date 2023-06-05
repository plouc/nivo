import React, { memo, useMemo, useState, useCallback } from 'react'
import styled from 'styled-components'
import { ChartProperty, Flavor } from '../../../types'
import { ObjectControlConfig, ControlContext } from '../types'
import { PropertyHeader, Help, Cell, Toggle } from '../ui'
import { ControlsGroup } from '../ControlsGroup'

interface ObjectControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    onChange: (value: object) => void
    value: object
    isOpenedByDefault?: boolean
    config: ObjectControlConfig
    context?: ControlContext
}

export const ObjectControl = memo(
    ({
        property,
        config,
        flavors,
        currentFlavor,
        value,
        onChange,
        context,
    }: ObjectControlProps) => {
        const [isOpened, setIsOpened] = useState(
            config.isOpenedByDefault !== undefined ? config.isOpenedByDefault : false
        )
        const toggle = useCallback(() => setIsOpened(flag => !flag), [setIsOpened])

        const subProps = useMemo(
            () =>
                config.props.map(prop => ({
                    ...prop,
                    name: prop.key,
                    group: property.group,
                })),
            [config.props]
        )

        const newContext = {
            path: [...(context ? context.path : []), property.key || property.name],
        }

        return (
            <>
                <Header isOpened={isOpened} onClick={toggle}>
                    <PropertyHeader {...property} context={context} />
                    <Help>{property.help}</Help>
                    <Toggle isOpened={isOpened} />
                </Header>
                {isOpened && (
                    <ControlsGroup
                        name={property.key}
                        flavors={flavors}
                        currentFlavor={currentFlavor}
                        controls={subProps}
                        settings={value}
                        onChange={onChange}
                        context={newContext}
                    />
                )}
            </>
        )
    }
)

const Title = styled.div`
    white-space: nowrap;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.accentLight};
`

const Header = styled(Cell)<{
    isOpened: boolean
}>`
    cursor: pointer;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

    &:last-child {
        border-bottom-width: 0;
    }

    &:hover {
        background: ${({ theme }) => theme.colors.cardAltBackground};

        ${Title} {
            color: ${({ theme }) => theme.colors.accent};
        }
    }

    ${Title} {
        ${({ isOpened, theme }) => (isOpened ? `color: ${theme.colors.accent};` : '')}
    }
`
