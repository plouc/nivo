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
import { BasicTooltip } from '@nivo/tooltip'

const LineTooltip = ({ serie }) => {
    return <BasicTooltip id={serie.id} enableChip={true} color={serie.color} />
}

LineTooltip.propTypes = {
    serie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
    }),
}

export default memo(LineTooltip)
