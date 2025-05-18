import React, { memo, useMemo, useState, useCallback } from 'react'
import styled from 'styled-components'
import { ChartPropertyWithControl, Flavor } from '../../../types'
import { ObjectControlConfig, ControlContext } from '../types'
import { PropertyHeader, Help, Cell, Toggle } from '../ui'
import { ControlsGroup } from '../ControlsGroup'

interface ObjectControlProps {
    id: string
    property: ChartPropertyWithControl<ObjectControlConfig>
    flavors: Flavor[]
    currentFlavor: Flavor
    value: Record<string, unknown>
    onChange: (value: Record<string, unknown>) => void
    isOpenedByDefault?: boolean
    context?: ControlContext
}

export const ObjectControl = memo(
    ({ property, flavors, currentFlavor, value, onChange, context }: ObjectControlProps) => {
        const { control } = property

        const [isOpened, setIsOpened] = useState(
            control.isOpenedByDefault !== undefined ? control.isOpenedByDefault : false
        )
        const toggle = useCallback(() => setIsOpened(flag => !flag), [setIsOpened])

        const subProps = useMemo(
            () =>
                control.props.map(prop => ({
                    ...prop,
                    name: prop.key,
                    group: property.group,
                })),
            [control.props]
        )

        const newContext = {
            path: [...(context ? context.path : []), property.key || property.name] as string[],
        }

        return (
            <>
                <Header $isOpened={isOpened} onClick={toggle}>
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
    $isOpened: boolean
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
        ${({ $isOpened, theme }) => ($isOpened ? `color: ${theme.colors.accent};` : '')}
    }
`
