import { to, SpringValue } from '@react-spring/web'

export const svgNodeTransform = (x: SpringValue<number>, y: SpringValue<number>) =>
    to([x, y], (x, y) => `translate(${x},${y})`)

export const htmlNodeTransform = (x: SpringValue<number>, y: SpringValue<number>) =>
    to([x, y], (x, y) => `translate(${x}px, ${y}px)`)

export const svgLabelTransform = (
    x: SpringValue<number>,
    y: SpringValue<number>,
    rotation: SpringValue<number>
) => to([x, y, rotation], (x, y, rotation) => `translate(${x},${y}) rotate(${rotation})`)

export const htmlLabelTransform = (
    x: SpringValue<number>,
    y: SpringValue<number>,
    rotation: SpringValue<number>
) => to([x, y, rotation], (x, y, rotation) => `translate(${x}px,${y}px) rotate(${rotation}deg)`)

// export const htmlParentLabelTransform = () => to()

/*
parentLabelHtmlTransform: `translate(${
    node.parentLabelX - (node.parentLabelRotation === 0 ? 0 : 5)
}px,${node.parentLabelY - (node.parentLabelRotation === 0 ? 5 : 0)}px) rotate(${
    node.parentLabelRotation
}deg)`,
*/
