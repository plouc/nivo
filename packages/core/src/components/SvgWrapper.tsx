import { Defs } from './defs'
import { useTheme } from '../theming'
import { SvgWrapperProps } from './types'

export const SvgWrapper = ({
    width,
    height,
    margin,
    defs,
    children,
    role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    isFocusable,
}: SvgWrapperProps) => {
    const theme = useTheme()

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            role={role}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
            focusable={isFocusable}
            tabIndex={isFocusable ? 0 : undefined}
        >
            <Defs defs={defs} />
            <rect width={width} height={height} fill={theme.background} />
            <g transform={`translate(${margin.left},${margin.top})`}>{children}</g>
        </svg>
    )
}
