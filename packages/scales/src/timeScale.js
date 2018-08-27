/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scaleTime } from 'd3-scale'
import first from 'lodash/first'
import last from 'lodash/last'

export default ({ axis, min = 'auto', max = 'auto' }, { width, height }, data) => {
    const values = data[axis]
    const size = axis === 'x' ? width : height

    console.log(values)
    const scale = scaleTime()
        .domain([new Date(first(values.all)), new Date(last(values.all))])
        .range([0, size])

    scale.type = 'time'

    return scale
}
