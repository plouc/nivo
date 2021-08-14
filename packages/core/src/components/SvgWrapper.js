import PropTypes from 'prop-types'
import { Defs } from './defs'
import { useTheme } from '../theming'

const SvgWrapper = ({
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
}) => {
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

SvgWrapper.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.shape({
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
    }).isRequired,
    defs: PropTypes.array,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    role: PropTypes.string,
    isFocusable: PropTypes.bool,
    ariaLabel: PropTypes.string,
    ariaLabelledBy: PropTypes.string,
    ariaDescribedBy: PropTypes.string,
}

export default SvgWrapper
