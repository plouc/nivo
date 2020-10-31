/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'

export const defsPropTypes = {
    defs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
        })
    ).isRequired,
    fill: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            match: PropTypes.oneOfType([PropTypes.oneOf(['*']), PropTypes.object, PropTypes.func])
                .isRequired,
        })
    ).isRequired,
}

export type SvgFillMatcher<T> = (datum: T) => boolean
export interface SvgDefsAndFill<T> {
    defs?: Array<{
        id: string
        [key: string]: any
    }>
    fill?: Array<{ id: string; match: Record<string, unknown> | SvgFillMatcher<T> | '*' }>
}
