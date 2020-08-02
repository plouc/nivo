/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, Fragment, useMemo, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import PropertyHeader from './PropertyHeader'
import ControlsGroup from './ControlsGroup'
import { Cell, Toggle, Help } from './styled'

const ArrayControl = memo(
    ({
        property,
        flavors,
        currentFlavor,
        value,
        onChange,
        options: {
            props,
            shouldCreate = false,
            addLabel = 'add',
            shouldRemove = false,
            removeLabel = 'remove',
            defaults = {},
            getItemTitle,
        },
    }) => {
        const [activeItems, setActiveItems] = useState([0])
        const append = useCallback(() => {
            onChange([...value, { ...defaults }])
            setActiveItems([value.length])
        }, [value, onChange, defaults, setActiveItems])
        const remove = useCallback(
            index => event => {
                event.stopPropagation()
                const items = value.filter((v, i) => i !== index)
                setActiveItems([])
                onChange(items)
            },
            [value, onChange, setActiveItems]
        )
        const change = useCallback(
            index => itemValue => {
                onChange(
                    value.map((v, i) => {
                        if (i === index) return itemValue
                        return v
                    })
                )
            },
            [value, onChange]
        )
        const toggle = useCallback(
            index => () => {
                setActiveItems(items => {
                    if (items.includes(index)) {
                        return items.filter(i => i !== index)
                    }
                    return [...activeItems, index]
                })
            },
            [setActiveItems]
        )

        const subProps = useMemo(
            () =>
                props.map(prop => ({
                    ...prop,
                    name: prop.key,
                    group: property.group,
                })),
            [props]
        )

        return (
            <>
                <Header>
                    <PropertyHeader {...property} />
                    <Help>{property.help}</Help>
                    {shouldCreate && <AddButton onClick={append}>{addLabel}</AddButton>}
                </Header>
                {value.map((item, index) => (
                    <Fragment key={index}>
                        <SubHeader isOpened={activeItems.includes(index)} onClick={toggle(index)}>
                            <Title>
                                {getItemTitle !== undefined
                                    ? getItemTitle(index, item)
                                    : `${property.key}[${index}]`}
                                {shouldRemove && (
                                    <RemoveButton onClick={remove(index)}>
                                        {removeLabel}
                                    </RemoveButton>
                                )}
                            </Title>
                            <Toggle isOpened={activeItems.includes(index)} />
                        </SubHeader>
                        {activeItems.includes(index) && (
                            <ControlsGroup
                                name={property.key}
                                flavors={flavors}
                                currentFlavor={currentFlavor}
                                controls={subProps}
                                settings={item}
                                onChange={change(index)}
                                isNested={true}
                            />
                        )}
                    </Fragment>
                ))}
            </>
        )
    }
)

ArrayControl.displayName = 'ArrayControl'
ArrayControl.propTypes = {
    property: PropTypes.object.isRequired,
    value: PropTypes.array.isRequired,
    flavors: PropTypes.arrayOf(PropTypes.oneOf(['svg', 'html', 'canvas', 'api'])).isRequired,
    currentFlavor: PropTypes.oneOf(['svg', 'html', 'canvas', 'api']).isRequired,
    options: PropTypes.shape({
        props: PropTypes.array.isRequired,
        shouldCreate: PropTypes.bool,
        addLabel: PropTypes.string,
        shouldRemove: PropTypes.bool,
        removeLabel: PropTypes.string,
        defaults: PropTypes.object,
        getItemTitle: PropTypes.func,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
}

export default ArrayControl

const Header = styled(Cell)`
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

    &:last-child {
        border-bottom-width: 0;
    }
`

const Title = styled.div`
    white-space: nowrap;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textLight};
`

const SubHeader = styled(Cell)`
    cursor: pointer;
    font-weight: 600;
    user-select: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

    &:last-child {
        border-bottom-width: 0;
    }

    &:hover {
        background: ${({ theme }) => theme.colors.cardAltBackground};

        ${Title} {
            color: ${({ theme }) => theme.colors.text};
        }
    }

    ${Title} {
        ${({ isOpened, theme }) => (isOpened ? `color: ${theme.colors.text};` : '')}
    }
`

const AddButton = styled.div`
    position: absolute;
    top: 9px;
    right: 20px;
    font-weight: 600;
    cursor: pointer;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.accent};
    border: 1px solid ${({ theme }) => theme.colors.accent};
    padding: 3px 9px;
    border-radius: 2px;
    user-select: none;

    &:hover {
        color: ${({ theme }) => theme.colors.cardBackground};
        background: ${({ theme }) => theme.colors.accent};
    }
`

const RemoveButton = styled.span`
    display: inline-block;
    font-size: 12px;
    margin-left: 12px;
    background: ${({ theme }) => theme.colors.cardBackground};
    color: ${({ theme }) => theme.colors.accent};
    border: 1px solid ${({ theme }) => theme.colors.accent};
    padding: 1px 9px;
    border-radius: 1px;

    &:hover {
        color: ${({ theme }) => theme.colors.cardBackground};
        background: ${({ theme }) => theme.colors.accent};
    }
`
