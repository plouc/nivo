import { ComponentType } from 'react'

export const setStatic =
    (key: string, value: any): (<T extends ComponentType<any>>(component: T) => T) =>
    BaseComponent => {
        /* eslint-disable no-param-reassign */
        // @ts-expect-error there's no way to type this
        BaseComponent[key] = value
        /* eslint-enable no-param-reassign */
        return BaseComponent
    }
