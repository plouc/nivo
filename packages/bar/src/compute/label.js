/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Generates label x/y
 * @param {number}  width
 * @param {number}  height
 * @param {string}  groupMode
 * @param {string}  labelAnchor
 * @param {boolean} reverse
 * @param {Object}  theme
 * @param {string}  layout
 * @param {number}  value

 * @return {{ x: number, y: number, textAnchor: string}}
 */
export const generateLabelProps = (
    width,
    height,
    groupMode,
    labelAnchor,
    reverse,
    theme,
    layout,
    value
) => {
    if (labelAnchor === 'end' && groupMode === 'grouped') {
        const labelFontSize = theme.labels.text.fontSize
        const reverseBar = (reverse || value < 0) && !(reverse && value < 0)
        if (layout === 'vertical') {
            const labelY = reverseBar ? height + labelFontSize : -labelFontSize
            return {
                x: width / 2,
                y: labelY,
                textAnchor: 'middle',
            }
        } else {
            const labelX = reverseBar ? -labelFontSize : width + labelFontSize
            return {
                x: labelX,
                y: height / 2,
                textAnchor: reverseBar ? 'end' : 'start',
            }
        }
    } else {
        return { x: width / 2, y: height / 2, textAnchor: 'middle' }
    }
}
