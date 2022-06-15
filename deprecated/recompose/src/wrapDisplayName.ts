import { ComponentType } from 'react'
import { getDisplayName } from './getDisplayName'

export const wrapDisplayName = (BaseComponent: ComponentType<any>, hocName: string): string =>
    `${hocName}(${getDisplayName(BaseComponent)})`
