/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import LineSlicesItem from './LineSlicesItem'

class LineSlices extends React.Component {
    render() {
        const {
            slices,
            height,
            showTooltip,
            hideTooltip,
            theme,
            tooltip,
            tooltipFormat,
        } = this.props;
        // sliceWidth: half the distance from the previous point + half the distance to the next point
        let sliceWidth;
        // xOffset: half the distance from the previous point
        let xOffset;
        let lineSlicesItems = [];
        for (let i = 0; i < slices.length; i++) {
            const currentXPosition = slices[i].data[0].position.x;
            const previousXPosition = i > 0 ? slices[i - 1].data[0].position.x : null;
            const nextXPosition = i < slices.length - 1 ? slices[i + 1].data[0].position.x : null;
            const widthBetweenCurrentAndNext = (nextXPosition - currentXPosition);
            const widthBetweenPreviousAndCurrent = (currentXPosition - previousXPosition);
            // offset: amount to add to the first and last slices' sliceWidths so that the tooltip appears when the
            // mouse is within the offset amount to the left of the first point and to the right of the last point.
            const offset = 5;
            if (i === 0) {
                // This is the first slice, which does not have a previous x position
                sliceWidth = widthBetweenCurrentAndNext / 2 + offset;
                xOffset = -offset;
            } else if (i === slices.length - 1) {
                // This is the last slice, which does not have a next x position
                sliceWidth = widthBetweenPreviousAndCurrent / 2 + offset;
                xOffset = -widthBetweenPreviousAndCurrent / 2;
            } else {
                // This slice is in the middle of the graph
                sliceWidth = widthBetweenPreviousAndCurrent / 2 + widthBetweenCurrentAndNext / 2;
                xOffset = -widthBetweenPreviousAndCurrent / 2;
            }
            lineSlicesItems.push(
                <LineSlicesItem
                    key={slices[i].id}
                    xOffset={xOffset}
                    slice={slices[i]}
                    height={height}
                    width={sliceWidth}
                    showTooltip={showTooltip}
                    hideTooltip={hideTooltip}
                    theme={theme}
                    tooltipFormat={tooltipFormat}
                    tooltip={tooltip}
                />
            )
        }
        return <g>{lineSlicesItems.map(i => i)}</g>;
    }
}

LineSlices.propTypes = {
    slices: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
                PropTypes.instanceOf(Date),
            ]).isRequired,
            x: PropTypes.number.isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    data: PropTypes.shape({
                        x: PropTypes.oneOfType([
                            PropTypes.number,
                            PropTypes.string,
                            PropTypes.instanceOf(Date),
                        ]),
                        y: PropTypes.oneOfType([
                            PropTypes.number,
                            PropTypes.string,
                            PropTypes.instanceOf(Date),
                        ]),
                    }),
                    position: PropTypes.shape({
                        x: PropTypes.number,
                        y: PropTypes.number,
                    }).isRequired,
                    serie: PropTypes.shape({
                        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                        color: PropTypes.string.isRequired,
                    }).isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    height: PropTypes.number.isRequired,
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    tooltip: PropTypes.func,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
}

export default pure(LineSlices)
