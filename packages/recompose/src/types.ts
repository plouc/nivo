import { ComponentClass, ComponentType } from 'react'

export type Mapper<TInner, TOuter> = (input: TInner) => TOuter

export type PredicateDiff<T> = (current: T, next: T) => boolean

// Injects props and removes them from the prop requirements.
// Will not pass through the injected props if they are passed in during
// render. Also adds new prop requirements from TNeedsProps.
export interface InferableComponentEnhancerWithProps<TInjectedProps, TNeedsProps> {
    <P extends TInjectedProps>(component: ComponentType<P>): ComponentClass<
        Omit<P, keyof TInjectedProps> & TNeedsProps
    >
}

// Injects props and removes them from the prop requirements.
// Will not pass through the injected props if they are passed in during
// render.
export type InferableComponentEnhancer<TInjectedProps> = InferableComponentEnhancerWithProps<
    TInjectedProps,
    // eslint-disable-next-line @typescript-eslint/ban-types
    {}
>

export type DefaultingInferableComponentEnhancer<
    TInjectedProps
> = InferableComponentEnhancerWithProps<TInjectedProps, Partial<TInjectedProps>>
