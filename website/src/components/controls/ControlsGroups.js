/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ControlsGroup from '../controls/ControlsGroup'
import media from '../../theming/mediaQueries'

const Group = styled.div`
    // border-top: 1px solid ${({ theme }) => theme.colors.border};

    &:first-child {
        border-top-width: 0;
    }
`

const Title = styled.div`
    // border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding: 16px 30px;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 13px;
    line-height: 1em;
    // color: ${({ theme }) => theme.colors.cardBackground};
    color: white;
    background: ${({ theme }) => theme.colors.accent};
    background-image: linear-gradient(-90deg, #dc5a32, #c44a67);
    background-size: 200% 100%;
    background-repeat: no-repeat;
    background-position: top left;

    ${media.tablet`
        & {
            padding: 16px 20px 16px 30px;
        }
    `}

    ${media.mobile`
        & {
            padding: 16px 20px 16px 30px;
        }
    `}
`

const ControlsGroups = ({ groups, value, onChange }) => {
    return groups.map(group => {
        return (
            <Group key={group.name}>
                <Title>{group.name}</Title>
                <ControlsGroup
                    name={group.name}
                    controls={group.properties}
                    settings={value}
                    onChange={onChange}
                />
            </Group>
        )
    })
}

ControlsGroups.propTypes = {
    groups: PropTypes.array.isRequired,
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default ControlsGroups
