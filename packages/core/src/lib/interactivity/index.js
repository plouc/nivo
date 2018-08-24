/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export * from './detect'

export const getRelativeCursor = (el, event) => {
    const { clientX, clientY } = event
    const bounds = el.getBoundingClientRect()

    return [clientX - bounds.left, clientY - bounds.top]
}
