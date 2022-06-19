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
    const box = el.getBBox()

    // In a normal situation mouse enter / mouse leave events
    // capture the position ok. But when the chart is inside a scaled
    // element with a CSS transform like: `transform: scale(2);`
    // tooltip are not positioned ok.
    // Comparing original width `box.width` agains scaled width give us the
    // scaling factor to calculate ok mouse position
    const scaling = box.width === bounds.width ? 1 : box.width / bounds.width
    return [(clientX - bounds.left) * scaling, (clientY - bounds.top) * scaling]
}
