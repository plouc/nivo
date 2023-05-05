import { BoundingBox } from './types'

/**
 * Check if the provided bounding boxes touch/overlap.
 * We assume that the boxes are rectangular and axis-aligned.
 */
export const areBoundingBoxTouching = (boxA: BoundingBox, boxB: BoundingBox) => {
    const touchX = boxA.left <= boxB.right && boxB.left <= boxA.right
    const touchY = boxA.top <= boxB.bottom && boxB.top <= boxA.bottom

    return touchX && touchY
}
