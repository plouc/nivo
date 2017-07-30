import _ from 'lodash'
import PropTypes from 'prop-types'
import { scaleLinear, scaleBand, scalePoint } from 'd3'

const SCALE_LINEAR = 'linear'
const SCALE_BAND = 'band'
const SCALE_POINT = 'point'

export const scaleTypes = [SCALE_LINEAR, SCALE_BAND, SCALE_POINT]

export const scalePropTypes = {
    type: PropTypes.oneOf(scaleTypes).isRequired,
    axis: PropTypes.oneOf(['x', 'y']).isRequired,
    dataKey: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.func,
    ]),
    aggregate: PropTypes.array,
    maxOf: PropTypes.array,
    padding: PropTypes.number,
}

export const scalesPropType = (props, propName, componentName) => {
    const scales = props[propName]

    _.forOwn(scales, (scale, id) => {
        PropTypes.checkPropTypes(
            scalePropTypes,
            scale,
            `\`${propName}.${id}\``,
            componentName
        )
    })
}

export const createScale = (
    { type, axis, key, aggregate, maxOf, padding },
    data,
    width,
    height
) => {
    let mapper
    if (Array.isArray(aggregate)) {
        mapper = d => _.sum(aggregate.map(k => d[k]))
    } else if (Array.isArray(maxOf)) {
        mapper = d => _.max(maxOf.map(k => d[k]))
    } else if (_.isFunction(key)) {
        mapper = key
    } else {
        mapper = d => d[key]
    }

    const range = [axis === 'y' ? height : 0, axis === 'x' ? width : 0]

    let scale
    switch (type) {
        case SCALE_LINEAR:
            scale = scaleLinear()
                .rangeRound(range)
                .domain([0, _.max(data.map(mapper))])
            break

        case SCALE_BAND:
            scale = scaleBand().rangeRound(range).domain(data.map(mapper))

            if (padding !== undefined) {
                scale.padding(padding)
            }
            break

        case SCALE_POINT:
            scale = scalePoint().range(range).domain(data.map(mapper))
            break
    }

    return scale
}

export const scalesFromObject = (object, width, height, data) =>
    _.mapValues(object, (scale, id) =>
        createScale(Object.assign({}, scale, { id }), data, width, height)
    )
