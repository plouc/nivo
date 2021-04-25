import { ComponentType } from 'react'

export const getDisplayName = (component: ComponentType<any> | string): string | undefined => {
    if (typeof component === 'string') {
        return component
    }

    if (!component) {
        return undefined
    }

    return component.displayName || component.name || 'Component'
}
