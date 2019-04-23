/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { TableTooltip, Chip, useTheme } from '@nivo/core'

const ChordRibbonTooltip = memo(({ ribbon }) => {
    const theme = useTheme()

    return (
        <TableTooltip
            theme={theme}
            rows={[
                [
                    <Chip key="chip" color={ribbon.source.color} />,
                    <strong key="id">{ribbon.source.label}</strong>,
                    ribbon.source.formattedValue,
                ],
                [
                    <Chip key="chip" color={ribbon.target.color} />,
                    <strong key="id">{ribbon.target.label}</strong>,
                    ribbon.target.formattedValue,
                ],
            ]}
        />
    )
})

ChordRibbonTooltip.displayName = 'ChordRibbonTooltip'
ChordRibbonTooltip.propTypes = {
    ribbon: PropTypes.object.isRequired,
}

export default ChordRibbonTooltip
