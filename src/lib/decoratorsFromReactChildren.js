/*
 * This file is part of the nivo project.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React from 'react'

const decoratorsFromReactChildren = (children, type) => {
    const decorators = []

    React.Children.forEach(children, element => {
        if (React.isValidElement(element)) {
            if (element.type[type]) {
                decorators.push(element.type[type](element))
            }
        }
    })

    return decorators
}

export default decoratorsFromReactChildren
