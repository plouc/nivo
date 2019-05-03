/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { createContext, useMemo } from 'react'
import PropTypes from 'prop-types'

export const motionConfigContext = createContext()

export const MotionConfigProvider = ({ children, animate, stiffness, damping }) => {
    const value = useMemo(
        () => ({
            animate,
            springConfig: { stiffness, damping },
        }),
        [animate, stiffness, damping]
    )

    return <motionConfigContext.Provider value={value}>{children}</motionConfigContext.Provider>
}

MotionConfigProvider.propTypes = {
    children: PropTypes.node.isRequired,
    animate: PropTypes.bool.isRequired,
    stiffness: PropTypes.number.isRequired,
    damping: PropTypes.number.isRequired,
}
MotionConfigProvider.defaultProps = {
    animate: true,
    stiffness: 90,
    damping: 15,
}
