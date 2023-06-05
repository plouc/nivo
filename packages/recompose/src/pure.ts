import { ComponentType } from 'react'
import { setDisplayName } from './setDisplayName'
import { shallowEqual } from './shallowEqual'
import { shouldUpdate } from './shouldUpdate'
import { wrapDisplayName } from './wrapDisplayName'

export const pure = <TProps>(component: ComponentType<TProps>): ComponentType<TProps> => {
    const hoc = shouldUpdate((props, nextProps) => !shallowEqual(props, nextProps))

    if (process.env.NODE_ENV !== 'production') {
        // @ts-ignore
        return setDisplayName(wrapDisplayName(component, 'pure'))(hoc(component))
    }

    // @ts-ignore
    return hoc(component)
}
