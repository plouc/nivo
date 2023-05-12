import { PropsWithChildren, ComponentType } from 'react'
import { animated } from '@react-spring/web'
import { TextStyle as ThemeStyle } from '@nivo/theming'

type GetComponentProps<T> = T extends ComponentType<infer P> ? P : never
type AnimatedComponentProps = GetComponentProps<(typeof animated)['text']>

type TextProps = PropsWithChildren<
    Omit<AnimatedComponentProps, 'style'> & {
        style: AnimatedComponentProps['style'] &
            Pick<ThemeStyle, 'outlineWidth' | 'outlineColor' | 'outlineOpacity'>
    }
>

export const Text = ({ style: fullStyle, children, ...attributes }: TextProps) => {
    const { outlineWidth, outlineColor, outlineOpacity, ...style } = fullStyle

    return (
        <>
            {outlineWidth > 0 && (
                <animated.text
                    {...attributes}
                    style={{
                        ...style,
                        strokeWidth: outlineWidth * 2,
                        stroke: outlineColor,
                        strokeOpacity: outlineOpacity,
                        strokeLinejoin: 'round',
                    }}
                >
                    {children}
                </animated.text>
            )}
            <animated.text {...attributes} style={style}>
                {children}
            </animated.text>
        </>
    )
}
