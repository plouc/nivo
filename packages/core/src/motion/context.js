import { createContext, useMemo } from 'react'
import isString from 'lodash/isString.js'
import { config as presets } from '@react-spring/web'

export const motionConfigContext = createContext()

export const motionDefaultProps = {
    animate: true,
    config: 'default',
}

/**
 * MotionConfigProvider.propTypes = {
 *     children: PropTypes.node.isRequired,
 *     animate: motionPropTypes.animate,
 *     config: motionPropTypes.motionConfig,
 * }
 */
export const MotionConfigProvider = props => {
    const { children, animate = true, config = 'default' } = props

    const value = useMemo(() => {
        const reactSpringConfig = isString(config) ? presets[config] : config

        return {
            animate,
            config: reactSpringConfig,
        }
    }, [animate, config])

    return <motionConfigContext.Provider value={value}>{children}</motionConfigContext.Provider>
}
