export interface BorderRadiusCorners<V = number> {
    topLeft: V
    topRight: V
    bottomRight: V
    bottomLeft: V
}

export interface BorderRadiusObject<V = number> extends Partial<BorderRadiusCorners<V>> {
    top?: V
    bottom?: V
    left?: V
    right?: V
}

export type BorderRadius<V = number> = V | BorderRadiusObject<V>

/**
 * Normalize a borderRadius input into explicit corner values.
 *
 * Priority order is:
 * 1. Uniform number
 * 2. Explicit corner
 * 3. Group (top/bottom/left/right)
 * 4. 0
 *
 * We use a generic type here to allow for react-spring animated values.
 *
 * @param radius  either a uniform number, or an object mixing group+corner values
 * @returns       an object with topLeft, topRight, bottomRight, bottomLeft
 */
export const normalizeBorderRadius = <V = number>(
    radius: BorderRadius<V>
): BorderRadiusCorners<V> => {
    // Uniform number
    if (radius == null || typeof radius !== 'object') {
        const uniform = radius as V
        return { topLeft: uniform, topRight: uniform, bottomRight: uniform, bottomLeft: uniform }
    }

    // Groups and corners
    const obj = radius as BorderRadiusObject<V>
    const uniform = 0 as V
    const top = obj.top
    const bottom = obj.bottom
    const left = obj.left
    const right = obj.right

    return {
        topLeft: obj.topLeft ?? (top !== undefined ? top : (left ?? uniform)),
        topRight: obj.topRight ?? (top !== undefined ? top : (right ?? uniform)),
        bottomRight: obj.bottomRight ?? (bottom !== undefined ? bottom : (right ?? uniform)),
        bottomLeft: obj.bottomLeft ?? (bottom !== undefined ? bottom : (left ?? uniform)),
    }
}

/**
 * Adjusts corner radii so they never exceed half of the width/height or sum constraints.
 */
export const constrainBorderRadius = (
    radius: BorderRadius,
    width: number,
    height: number
): BorderRadiusCorners => {
    const { topLeft, topRight, bottomRight, bottomLeft } = normalizeBorderRadius(radius)

    let topLeftConstrained = Math.max(0, topLeft)
    let topRightConstrained = Math.max(0, topRight)
    let bottomRightConstrained = Math.max(0, bottomRight)
    let bottomLeftConstrained = Math.max(0, bottomLeft)

    // Horizontal constraints per edge
    const sumTop = topLeftConstrained + topRightConstrained
    if (sumTop > width) {
        const scale = width / sumTop
        topLeftConstrained *= scale
        topRightConstrained *= scale
    }
    const sumBottom = bottomLeftConstrained + bottomRightConstrained
    if (sumBottom > width) {
        const scale = width / sumBottom
        bottomLeftConstrained *= scale
        bottomRightConstrained *= scale
    }

    // Vertical constraints per edge
    const sumLeft = topLeftConstrained + bottomLeftConstrained
    if (sumLeft > height) {
        const scale = height / sumLeft
        topLeftConstrained *= scale
        bottomLeftConstrained *= scale
    }
    const sumRight = topRightConstrained + bottomRightConstrained
    if (sumRight > height) {
        const scale = height / sumRight
        topRightConstrained *= scale
        bottomRightConstrained *= scale
    }

    return {
        topLeft: topLeftConstrained,
        topRight: topRightConstrained,
        bottomRight: bottomRightConstrained,
        bottomLeft: bottomLeftConstrained,
    }
}
