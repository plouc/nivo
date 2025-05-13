import AutoSizer from 'react-virtualized-auto-sizer'
import { useDebounce } from 'use-debounce'
import { useEffect } from 'react'

const dimensionsEqual = (a, b) => a.width === b.width && a.height === b.height

const InnerResponsiveWrapper = ({ children, width, height, onResize, debounceResize }) => {
    const [dimensions] = useDebounce({ width, height }, debounceResize, {
        equalityFn: dimensionsEqual,
    })

    useEffect(() => {
        onResize?.(dimensions)
    }, [dimensions, onResize])

    return <>{children(dimensions)}</>
}

export const ResponsiveWrapper = ({
    children,
    defaultWidth,
    defaultHeight,
    onResize,
    debounceResize = 0,
}) => (
    <AutoSizer defaultWidth={defaultWidth} defaultHeight={defaultHeight}>
        {({ width, height }) => (
            <InnerResponsiveWrapper
                width={width}
                height={height}
                onResize={onResize}
                debounceResize={debounceResize}
            >
                {children}
            </InnerResponsiveWrapper>
        )}
    </AutoSizer>
)
