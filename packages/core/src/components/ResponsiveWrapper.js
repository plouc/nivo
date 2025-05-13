import AutoSizer from 'react-virtualized-auto-sizer'
import { useDebounce } from 'use-debounce'

const dimensionsEqual = (a, b) => a.width === b.width && a.height === b.height

const InnerResponsiveWrapper = ({ children, debounce, width, height }) => {
    const [dimensions] = useDebounce({ width, height }, debounce, { equalityFn: dimensionsEqual })

    return <>{children(dimensions)}</>
}

export const ResponsiveWrapper = ({
    children,
    defaultWidth,
    defaultHeight,
    debounceResize = 0,
}) => (
    <AutoSizer defaultWidth={defaultWidth} defaultHeight={defaultHeight}>
        {({ width, height }) => (
            <InnerResponsiveWrapper debounce={debounceResize} width={width} height={height}>
                {children}
            </InnerResponsiveWrapper>
        )}
    </AutoSizer>
)
