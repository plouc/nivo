import { memo, useMemo, useState, useCallback } from 'react'
import styled from 'styled-components'
import { ChartProperty, ControlContext } from '../types'
import { ObjectControlConfig } from './types'
import { ControlHeader, ControlHelp } from '../chrome'
import { ControlGroup } from '../ControlGroup'

interface ObjectControlProps {
    property: ChartProperty<ObjectControlConfig>
    context?: ControlContext
    value: Record<string, unknown>
    onChange: (v: Record<string, unknown>) => void
}

export const ObjectControl = memo(({ property, context, value, onChange }: ObjectControlProps) => {
    const [isOpened, setIsOpened] = useState(property.control.isOpenedByDefault === true)
    const toggle = useCallback(() => setIsOpened(flag => !flag), [setIsOpened])

    const group = property.group
    const props = property.control.props
    const subProps: ChartProperty<any>[] = useMemo(
        () =>
            props.map(prop => ({
                ...prop,
                group,
            })),
        [props, group]
    )

    const newContext = {
        ...context,
        path: [...(context ? context.path : []), property.name] as string[],
    }

    return (
        <>
            <Header $isOpened={isOpened} onClick={toggle}>
                <ControlHeader property={property} context={context} />
                <ControlHelp>{property.help}</ControlHelp>
                {/*<Toggle isOpened={isOpened} />*/}
            </Header>
            {isOpened && (
                <ControlGroup
                    name={property.name}
                    props={subProps}
                    context={newContext}
                    value={value}
                    onChange={onChange}
                />
            )}
        </>
    )
})

const Title = styled.div`
    white-space: nowrap;
    font-weight: 600;
`

const Header = styled.div<{
    $isOpened: boolean
}>`
    position: relative;
    font-size: 0.9rem;
    cursor: pointer;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding: ${({ theme }) => theme.spacing[5]} ${({ theme }) => theme.spacing[6]};

    &:last-child {
        border-bottom-width: 0;
    }

    &:hover {
        ${Title} {
            color: ${({ theme }) => theme.colors.accent};
        }
    }

    ${Title} {
        ${({ $isOpened, theme }) => ($isOpened ? `color: ${theme.colors.accent};` : '')}
    }
`
