/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { createContext, useMemo } from 'react'
import { isString } from 'lodash'
import PropTypes from 'prop-types'
import { config as presets } from 'react-spring'

export const motionConfigContext = createContext()

/**
 * For now we're supporting both react-motion and react-spring,
 * however, react-motion will be gradually replaced by react-spring.
 */
export const MotionConfigProvider = ({ children, animate, stiffness, damping, config }) => {
    const value = useMemo(() => {
        const reactSpringConfig = isString(config) ? presets[config] : config

        return {
            animate,
            springConfig: { stiffness, damping },
            config: reactSpringConfig,
        }
    }, [animate, stiffness, damping, config])

    return <motionConfigContext.Provider value={value}>{children}</motionConfigContext.Provider>
}

MotionConfigProvider.propTypes = {
    children: PropTypes.node.isRequired,
    animate: PropTypes.bool,
    stiffness: PropTypes.number,
    damping: PropTypes.number,
    config: PropTypes.oneOfType([
        PropTypes.oneOf(Object.keys(presets)),
        PropTypes.shape({
            mass: PropTypes.number,
            tension: PropTypes.number,
            friction: PropTypes.number,
            clamp: PropTypes.bool,
            precision: PropTypes.number,
            velocity: PropTypes.number,
            duration: PropTypes.number,
            easing: PropTypes.func,
        }),
    ]),
}
MotionConfigProvider.defaultProps = {
    animate: true,
    stiffness: 90,
    damping: 15,
    config: 'default',
}
