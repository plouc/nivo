import { ComputedCell } from '@nivo/heatmap'

export const CustomTooltip = ({ cell }: { cell: ComputedCell<any> }) => {
    return (
        <div
            style={{
                backgroundColor: cell.color,
                color: '#ffffff',
                padding: '6px 9px',
                borderRadius: '2px',
                minWidth: '160px',
                boxShadow: '0 3px 5px rgba(0, 0, 0, .25)',
                whiteSpace: 'pre',
            }}
        >
            {'id   '}&nbsp;<strong>{cell.id}</strong>
            <br />
            {'serie'}&nbsp;<strong>{cell.serieId}</strong>
            <br />
            {'x    '}&nbsp;<strong>{cell.data.x}</strong>
            <br />
            {'value'}&nbsp;<strong>{cell.formattedValue}</strong>
        </div>
    )
}
