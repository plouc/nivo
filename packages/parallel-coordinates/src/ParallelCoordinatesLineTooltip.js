/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { themePropType, TableTooltip } from '@nivo/core'

export default class ParallelCoordinatesLineTooltip extends PureComponent {
    static propTypes = {
        data: PropTypes.object.isRequired,
        variables: PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            })
        ).isRequired,
        theme: themePropType.isRequired,
    }

    render() {
        const { data, variables, theme } = this.props

        return (
            <TableTooltip
                theme={theme}
                rows={variables.map(variable => [
                    variable.key,
                    <strong>{data[variable.key]}</strong>, // eslint-disable-line react/jsx-key
                ])}
            />
        )
    }
}
