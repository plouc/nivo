/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useMemo, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ControlsGroup from './ControlsGroup'
import PropertyHeader from './PropertyHeader'
import { Cell, Toggle, Help } from './styled'

const ObjectControl = memo(
    ({
        property,
        flavors,
        currentFlavor,
        value,
        props,
        onChange,
        context,
        isOpenedByDefault = false,
    }) => {
        const [isOpened, setIsOpened] = useState(isOpenedByDefault)
        const toggle = useCallback(() => setIsOpened(flag => !flag), [setIsOpened])

        const subProps = useMemo(() =>
            props.map(prop => ({
                ...prop,
                name: prop.key,
                group: property.group,
            }))
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
                        isNested={true}
                        context={newContext}
                    />
                )}
            </>
        )
    }
)

ObjectControl.displayName = 'ObjectControl'
ObjectControl.propTypes = {
    property: PropTypes.object.isRequired,
    flavors: PropTypes.arrayOf(PropTypes.oneOf(['svg', 'html', 'canvas', 'api'])).isRequired,
    currentFlavor: PropTypes.oneOf(['svg', 'html', 'canvas', 'api']).isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired,
    props: PropTypes.array.isRequired,
    isOpenedByDefault: PropTypes.bool,
}

export default ObjectControl

const Title = styled.div`
    white-space: nowrap;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.accentLight};
`

const Header = styled(Cell)`
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
