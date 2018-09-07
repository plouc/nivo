/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { computeParallelCoordinatesLayout } from './compute'

export default class ParallelCoordinatesLayout extends PureComponent {
    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.array]))
            .isRequired,
        variables: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.shape({
                    key: PropTypes.string.isRequired,
                    type: PropTypes.oneOf(['point']).isRequired,
                    padding: PropTypes.number,
                    values: PropTypes.arrayOf(
                        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                    ),
                }),
                PropTypes.shape({
                    key: PropTypes.string.isRequired,
                    type: PropTypes.oneOf(['linear']).isRequired,
                    min: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
                    max: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
                }),
            ])
        ).isRequired,
        layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
        children: PropTypes.func.isRequired,
    }

    render() {
        const { width, height, data, variables, layout, children } = this.props

        return children(
            computeParallelCoordinatesLayout({
                width,
                height,
                data,
                variables,
                layout,
            })
        )
    }
}
