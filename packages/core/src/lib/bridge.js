/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export const textPropsByEngine = {
    svg: {
        align: {
            left: 'start',
            center: 'middle',
            right: 'end',
        },
        baseline: {
            top: 'text-before-edge',
            center: 'central',
            bottom: 'alphabetic',
        },
    },
    canvas: {
        align: {
            left: 'left',
            center: 'center',
            right: 'right',
        },
        baseline: {
            top: 'top',
            center: 'middle',
            bottom: 'bottom',
        },
    },
}
