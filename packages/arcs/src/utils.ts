/**
 * Make sure an angle (expressed in radians)
 * always fall in the range 0~2*PI.
 */
export const getNormalizedAngle = (angle: number) => {
    let normalizedAngle = angle % (Math.PI * 2)
    if (normalizedAngle < 0) {
        normalizedAngle += Math.PI * 2
    }

    return normalizedAngle
}
