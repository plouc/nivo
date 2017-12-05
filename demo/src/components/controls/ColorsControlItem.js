/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ColorsControlItem extends Component {
    render() {
        const { id, colors } = this.props

        return (
            <div className="colors_item">
                <span className="colors_item_label">{id}</span>
                <div className="colors_item_colors">
                    {colors.map(color => (
                        <span
                            key={color}
                            className="colors_item_colors_item"
                            style={{ background: color }}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

ColorsControlItem.propTypes = {
    id: PropTypes.string.isRequired,
    colors: PropTypes.array.isRequired,
}

export default ColorsControlItem
