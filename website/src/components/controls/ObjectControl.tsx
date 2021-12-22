import React, { memo, useMemo, useState, useCallback } from 'react'
import styled from 'styled-components'
import ControlsGroup from './ControlsGroup'
import { PropertyHeader } from './PropertyHeader'
import { Cell, Toggle } from './styled'
import { Help } from './Help'
import { ChartProperty, Flavor } from '../../types'
import { ObjectControlConfig } from './types'

interface ObjectControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    onChange: (value: object) => void
    value: object
    isOpenedByDefault?: boolean
    config: ObjectControlConfig
    context: any
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
        isOpenedByDefault = false,
    }: ObjectControlProps) => {
        const [isOpened, setIsOpened] = useState(isOpenedByDefault)
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
