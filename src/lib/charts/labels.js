/*
 * This file is part of the nivo project.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import d3 from 'd3'

// label positioning
export const LABEL_POSITION_CENTER = 'center'
export const LABEL_POSITION_TOP = 'top'
export const LABEL_POSITION_RIGHT = 'right'
export const LABEL_POSITION_BOTTOM = 'bottom'
export const LABEL_POSITION_LEFT = 'left'

const labelMaker = ({
    text,
    position,
    labelOffset,
    labelPaddingX,
    labelPaddingY,
}) => {
    return g => {
        let labelBackground = g.select('rect')
        let labelText = g.select('text')

        if (labelBackground.empty()) {
            labelBackground = g.append('rect')
            labelText = g.append('text')
        }

        labelText
            .attr('alignment-baseline', 'text-before-edge')
            .style('fill', '#fff')
            .text(text)

        const textBBox = labelText.node().getBBox()

        let textX = 0
        let textY = 0

        let bgX = 0
        let bgY = 0

        switch (position) {
            case 'center':
                textX = -textBBox.width / 2
                textY = -textBBox.height / 2

                bgX = -textBBox.width / 2 - labelPaddingX
                bgY = -textBBox.height / 2 - labelPaddingY
                break

            case 'top':
                textX = -textBBox.width / 2
                textY = -textBBox.height - labelOffset - labelPaddingY

                bgX = -textBBox.width / 2 - labelPaddingX
                bgY = -textBBox.height - labelOffset - labelPaddingY * 2
                break

            case 'right':
                textX = labelOffset + labelPaddingX
                textY = -textBBox.height / 2

                bgX = labelOffset
                bgY = -textBBox.height / 2 - labelPaddingY
                break

            case 'bottom':
                textX = -textBBox.width / 2
                textY = labelOffset + labelPaddingY

                bgX = -textBBox.width / 2 - labelPaddingX
                bgY = labelOffset
                break

            case 'left':
                textX = -textBBox.width - labelOffset - labelPaddingX
                textY = -textBBox.height / 2

                bgX = -textBBox.width - labelOffset - labelPaddingX * 2
                bgY = -textBBox.height / 2 - labelPaddingY
                break
        }

        d3.transition(labelBackground).style('fill', '#e25d47').attr({
            width: textBBox.width + labelPaddingX * 2,
            height: textBBox.height + labelPaddingY * 2,
            rx: 2,
            ry: 2,
            transform: `translate(${bgX},${bgY})`,
        })

        d3
            .transition(labelText)
            .attr('transform', `translate(${textX},${textY})`)
    }
}

export default labelMaker
