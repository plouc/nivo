export const LinearGradient = ({ id, colors, ...rest }) => (
    <linearGradient id={id} x1={0} x2={0} y1={0} y2={1} {...rest}>
        {colors.map(({ offset, color, opacity }) => (
            <stop
                key={offset}
                offset={`${offset}%`}
                stopColor={color}
                stopOpacity={opacity !== undefined ? opacity : 1}
            />
        ))}
    </linearGradient>
)

export const linearGradientDef = (id, colors, options = {}) => ({
    id,
    type: 'linearGradient',
    colors,
    ...options,
})
