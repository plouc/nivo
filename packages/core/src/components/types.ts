import { AriaAttributes, ComponentType, ReactElement, ReactNode } from 'react'
import { DefsProps } from './defs'
import { Theme } from '../theming'
import { Margin } from '../types'
import { MotionContextProps } from '../motion'

export interface SvgWrapperProps extends DefsProps {
    width: number
    height: number
    margin: Margin
    children?: ReactNode
    role?: string
    isFocusable?: boolean
    ariaLabel?: AriaAttributes['aria-label']
    ariaLabelledBy?: AriaAttributes['aria-labelledby']
    ariaDescribedBy?: AriaAttributes['aria-describedby']
}

export interface ResponsiveWrapperProps {
    children: (dimensions: { width: number; height: number }) => JSX.Element
}

export interface ContainerProps {
    children: ReactNode
    theme?: Theme
    renderWrapper?: boolean
    isInteractive?: boolean
    animate?: boolean
    motionStiffness?: number
    motionDamping?: number
    motionConfig?: MotionContextProps['config']
}

export interface ConditionalWrapperProps {
    children: ReactNode
    condition: boolean
    wrapper: ReactElement<HTMLDivElement>
}

export type ExtractProps<TComponent> = TComponent extends ComponentType<infer TProps>
    ? TProps
    : never
