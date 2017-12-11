/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import isPlainObject from 'lodash/isPlainObject'
import PropTypes from 'prop-types'

export const scalesPropType = extraProps => {
    const extendedScalePropType = PropTypes.shape({
        ...extraProps,
        axis: PropTypes.oneOf(['x', 'y']).isRequired,
        domain: PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])])
        ).isRequired,
    }).isRequired

    return (props, propName, componentName) => {
        PropTypes.checkPropTypes(
            { scales: PropTypes.object.isRequired },
            props,
            'prop',
            componentName
        )

        const scales = props[propName]
        if (isPlainObject(scales)) {
            Object.keys(scales).forEach(id => {
                const fullKey = `${propName}.${id}`
                PropTypes.checkPropTypes(
                    { [fullKey]: extendedScalePropType },
                    { [fullKey]: scales[id] },
                    'prop',
                    componentName
                )
            })
        }
    }
}
