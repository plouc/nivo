import { TooltipProps, DatumGroupKeys, BaseDatum } from '@nivo/parallel-coordinates'

export const CustomTooltip = <
    Datum extends BaseDatum,
    GroupBy extends DatumGroupKeys<Datum> | undefined
>({
    datum,
}: TooltipProps<Datum, GroupBy>) => (
    <div
        style={{
            backgroundColor: '#eeeeee',
            padding: '12px',
            borderRadius: '3px',
            color: datum.color,
            fontWeight: 'bold',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridColumnGap: '12px',
            boxShadow: '2px 5px 5px #00000033',
        }}
    >
        Yay! I'm custom (datum: {datum.id})
    </div>
)
