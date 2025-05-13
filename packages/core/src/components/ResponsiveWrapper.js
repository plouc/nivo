import AutoSizer from 'react-virtualized-auto-sizer'

export const ResponsiveWrapper = ({ children, defaultWidth, defaultHeight }) => (
    <AutoSizer defaultWidth={defaultWidth} defaultHeight={defaultHeight}>
        {children}
    </AutoSizer>
)
