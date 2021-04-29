/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
<<<<<<< HEAD
import React from 'react'
import { ResponsiveWrapper } from '@bitbloom/nivo-core'
=======
import React, { forwardRef } from 'react'
import { ResponsiveWrapper } from '@nivo/core'
>>>>>>> 53b9c1cc7b439d550e8c2084bbd420c334082881
import LineCanvas from './LineCanvas'

const ResponsiveLineCanvas = (props, ref) => (
    <ResponsiveWrapper>
        {({ width, height }) => <LineCanvas width={width} height={height} {...props} ref={ref} />}
    </ResponsiveWrapper>
)

export default forwardRef(ResponsiveLineCanvas)
