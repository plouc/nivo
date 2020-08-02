/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import Control from './Control'
import PropertyHeader from './PropertyHeader'
import { Help } from './styled'
import Switch from './Switch'

const SwitchControl = memo(({ id, property, flavors, currentFlavor, value, onChange }) => {
    return (
        <Control
            id={id}
            description={property.description}
            flavors={flavors}
            currentFlavor={currentFlavor}
            supportedFlavors={property.flavors}
        >
            <PropertyHeader id={id} {...property} />
            <Switch id={id} value={value} onChange={onChange} />
            &nbsp;&nbsp;&nbsp;
            <Help>{property.help}</Help>
        </Control>
    )
})

SwitchControl.displayName = 'SwitchControl'
SwitchControl.propTypes = {
    id: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired,
    flavors: PropTypes.arrayOf(PropTypes.oneOf(['svg', 'html', 'canvas', 'api'])).isRequired,
    currentFlavor: PropTypes.oneOf(['svg', 'html', 'canvas', 'api']).isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default SwitchControl
