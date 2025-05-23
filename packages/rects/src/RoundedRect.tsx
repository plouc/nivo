import { forwardRef, ComponentProps } from 'react'
import { animated, to, SpringValue, Interpolation } from '@react-spring/web'
import { normalizeBorderRadius, constrainBorderRadius, BorderRadius } from '@nivo/theming'

type AnimatedPathProps = ComponentProps<typeof animated.path>

/**
 * Draws either an arc to (toX,toY) of radius r, or a straight line if radius===0
 */
const corner = (radius: number, toX: number, toY: number): string => {
    return radius > 0 ? `A${radius},${radius} 0 0 1 ${toX},${toY}` : `L${toX},${toY}`
}

/**
 * Helper to construct an SVG path for a rectangle with per-corner radii.
 * Radii are first constrained to avoid drawing artifacts when large.
 */
export function buildRoundedRectPath(
    x: number,
    y: number,
    width: number,
    height: number,
    topLeft: number,
    topRight: number,
    bottomRight: number,
    bottomLeft: number
): string {
    const {
        topLeft: topLeftConstrained,
        topRight: topRightConstrained,
        bottomRight: bottomRightConstrained,
        bottomLeft: bottomLeftConstrained,
    } = constrainBorderRadius({ topLeft, topRight, bottomRight, bottomLeft }, width, height)

    return [
        `M${x + topLeftConstrained},${y}`,
        `H${x + width - topRightConstrained}`,
        corner(topRightConstrained, x + width, y + topRightConstrained),
        `V${y + height - bottomRightConstrained}`,
        corner(bottomRightConstrained, x + width - bottomRightConstrained, y + height),
        `H${x + bottomLeftConstrained}`,
        corner(bottomLeftConstrained, x, y + height - bottomLeftConstrained),
        `V${y + topLeftConstrained}`,
        corner(topLeftConstrained, x + topLeftConstrained, y),
        'Z',
    ].join(' ')
}

type AnimatedValue = number | SpringValue<number> | Interpolation<number, number>

/**
 * Use spring values or numbers for geometry,
 * and any animated-compatible SVG path prop (e.g., opacity).
 */
export interface RoundedRectProps extends Omit<AnimatedPathProps, 'd' | 'r' | 'ref'> {
    width: AnimatedValue
    height: AnimatedValue
    x?: AnimatedValue
    y?: AnimatedValue
    r?: BorderRadius<AnimatedValue>
}

/**
 * SVGRect only supports rx and ry for corner radii, this component allows for individual corner radii.
 */
export const RoundedRect = forwardRef<SVGPathElement, RoundedRectProps>(
    (
        {
            x = 0,
            y = 0,
            width,
            height,
            // Not fond of abbreviating, but since SVGRect uses rx/ry, we'll follow suit.
            r = 0,
            ...svgProps
        },
        ref
    ) => {
        const { topLeft, topRight, bottomRight, bottomLeft } =
            normalizeBorderRadius<AnimatedValue>(r)

        const d = to(
            [x, y, width, height, topLeft, topRight, bottomRight, bottomLeft],
            (xx, yy, w, h, topLeft, topRight, bottomRight, bottomLeft) =>
                buildRoundedRectPath(xx, yy, w, h, topLeft, topRight, bottomRight, bottomLeft)
        )

        return <animated.path ref={ref} d={d} {...svgProps} />
    }
)
