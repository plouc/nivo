/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export * from './detect'

/**
 * Get the position of the cursor (from `event`) relative
 * to its container (`el`).
 *
 * In a normal situation mouse enter/leave events
 * capture the position ok. But when the chart is inside a scaled
 * element with a CSS transform like: `transform: scale(2);`
 * tooltip are not positioned ok.
 *
 * Comparing original width `box.width` against the scaled width
 * give us the scaling factor to calculate the proper mouse position.
 */
export const getRelativeCursor = (el, event) => {
    const { clientX, clientY } = event
    // Get the dimensions of the element, in case it has
    // been scaled using a transform for example, we get
    // the scaled dimensions, not the original ones.
    const currentBox = el.getBoundingClientRect()

    // Original dimensions, necessary to compute `scaleFactor`.
    let originalBox
    if (el.getBBox !== undefined) {
        // For SVG elements.
        originalBox = el.getBBox()
    } else {
        // Other elements.
        originalBox = {
            width: el.offsetWidth,
            height: el.offsetHeight,
        }
    }

    const scaleFactor =
        originalBox.width === currentBox.width ? 1 : originalBox.width / currentBox.width
    return [(clientX - currentBox.left) * scaleFactor, (clientY - currentBox.top) * scaleFactor]
}
