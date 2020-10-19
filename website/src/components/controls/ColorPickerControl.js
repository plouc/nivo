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
import Control from './Control'
import PropertyHeader from './PropertyHeader'
import { Help } from './styled'

class ColorPickerControl extends Component {
    handleChange = e => {
        this.props.onChange(e.target.value)
    }

    render() {
        const { id, property, flavors, currentFlavor, value, context } = this.props

        return (
            <Control
                id={id}
                description={property.description}
                flavors={flavors}
                currentFlavor={currentFlavor}
                supportedFlavors={property.flavors}
            >
                <PropertyHeader id={id} {...property} context={context} />
                <div>
                    <input type="color" id={id} onChange={this.handleChange} value={value} />
                    &nbsp;&nbsp;&nbsp;
                    <code className="code code-string">{value}</code>
                </div>
                <Help>{property.help}</Help>
            </Control>
        )
    }
}

ColorPickerControl.propTypes = {
    id: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired,
    flavors: PropTypes.arrayOf(PropTypes.oneOf(['svg', 'html', 'canvas', 'api'])).isRequired,
    currentFlavor: PropTypes.oneOf(['svg', 'html', 'canvas', 'api']).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    context: PropTypes.object,
}

export default ColorPickerControl
