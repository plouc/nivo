import { createElement, memo } from 'react'
import { gradientTypes } from './gradients'
import { patternTypes } from './patterns'

export const defsMapping = {
    ...gradientTypes,
    ...patternTypes,
}

/**
 * Defs.propTypes = {
 *     defs: PropTypes.arrayOf(
 *         PropTypes.shape({
 *             type: PropTypes.oneOf(Object.keys(defsMapping)).isRequired,
 *             id: PropTypes.string.isRequired,
 *         })
 *     ),
 * }
 */
const Defs = ({ defs: definitions }) => {
    if (!definitions || definitions.length < 1) return null

    return (
        <defs aria-hidden={true}>
            {definitions.map(({ type, ...def }) => {
                if (defsMapping[type])
                    return createElement(defsMapping[type], { key: def.id, ...def })

                return null
            })}
        </defs>
    )
}

export default memo(Defs)
