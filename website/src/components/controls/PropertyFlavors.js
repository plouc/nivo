/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const PropertyFlavors = memo(({ flavors, supportedFlavors }) => {
    return (
        <div>
            <Container>
                <Label>support</Label>
                {flavors.map(flavor => {
                    return (
                        <Flavor key={flavor} isSupported={supportedFlavors.includes(flavor)}>
                            {flavor}
                        </Flavor>
                    )
                })}
            </Container>
        </div>
    )
})

PropertyFlavors.propTypes = {
    flavors: PropTypes.arrayOf(PropTypes.oneOf(['svg', 'html', 'canvas', 'api'])).isRequired,
    supportedFlavors: PropTypes.arrayOf(PropTypes.oneOf(['svg', 'html', 'canvas', 'api']))
        .isRequired,
}

export default PropertyFlavors

const Container = styled.div`
    margin-top: 9px;
    display: inline-flex;
    align-items: center;
    border-radius: 2px;
`

const Label = styled.span`
    font-size: 12px;
    font-weight: 600;
    margin-right: 9px;
`

const Flavor = styled.span`
    font-size: 11px;
    line-height: 1em;
    font-weight: ${({ isSupported }) => (isSupported ? 600 : 400)};
    padding: 3px 8px 5px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-right-width: 0;
    color: ${({ isSupported, theme }) =>
        isSupported ? theme.colors.text : theme.colors.textLight};

    &:last-child {
        border-right-width: 1px;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
    }
`
