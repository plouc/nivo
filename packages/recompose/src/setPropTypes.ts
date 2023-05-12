import { ComponentType, ValidationMap } from 'react'
import { setStatic } from './setStatic'

export const setPropTypes: any = <P>(
    propTypes: ValidationMap<P>
): (<T extends ComponentType<P>>(component: T) => T) => setStatic('propTypes', propTypes)
