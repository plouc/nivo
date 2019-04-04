/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import { Chip, TableTooltip } from '@nivo/core'

const ChordRibbonTooltip = ({ ribbon, theme, format }) => (
    <TableTooltip
        theme={theme}
        rows={[
            [
                <Chip key="chip" color={ribbon.source.color} />,
                <strong key="id">{ribbon.source.id}</strong>,
                format ? format(ribbon.source.value) : ribbon.source.value,
            ],
            [
                <Chip key="chip" color={ribbon.target.color} />,
                <strong key="id">{ribbon.target.id}</strong>,
                format ? format(ribbon.target.value) : ribbon.target.value,
            ],
        ]}
    />
)

ChordRibbonTooltip.propTypes = {
    ribbon: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    format: PropTypes.func,
}

export default pure(ChordRibbonTooltip)
