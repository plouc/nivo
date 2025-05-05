import { PropsWithChildren, ComponentProps } from 'react'
import { animated } from '@react-spring/web'
import { TextStyle } from '@nivo/theming'

type AnimatedComponentProps = ComponentProps<(typeof animated)['text']>

export type TextProps = PropsWithChildren<
    Omit<AnimatedComponentProps, 'style'> & {
        style: AnimatedComponentProps['style'] &
            Pick<TextStyle, 'outlineWidth' | 'outlineColor' | 'outlineOpacity'>
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
