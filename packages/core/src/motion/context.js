import { createContext, useMemo } from 'react'
import { isString } from 'lodash'
import PropTypes from 'prop-types'
import { config as presets } from '@react-spring/web'

export const motionConfigContext = createContext()

export const MotionConfigProvider = ({ children, animate, config }) => {
    const value = useMemo(() => {
        const reactSpringConfig = isString(config) ? presets[config] : config

        return {
            animate,
            config: reactSpringConfig,
        }
    }, [animate, config])

    return <motionConfigContext.Provider value={value}>{children}</motionConfigContext.Provider>
}

export const motionPropTypes = {
    animate: PropTypes.bool,
    motionConfig: PropTypes.oneOfType([
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

MotionConfigProvider.propTypes = {
    children: PropTypes.node.isRequired,
    animate: motionPropTypes.animate,
    config: motionPropTypes.motionConfig,
}

export const motionDefaultProps = {
    animate: true,
    config: 'default',
}

MotionConfigProvider.defaultProps = motionDefaultProps
