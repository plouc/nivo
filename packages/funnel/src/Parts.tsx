import { Part } from './Part'
import {
    FunnelPartWithHandlers,
    FunnelAreaGenerator,
    FunnelBorderGenerator,
    FunnelDatum,
} from './types'

interface PartsProps<D extends FunnelDatum> {
    parts: FunnelPartWithHandlers<D>[]
    areaGenerator: FunnelAreaGenerator
    borderGenerator: FunnelBorderGenerator
}

export const Parts = <D extends FunnelDatum>({
    parts,
    areaGenerator,
    borderGenerator,
}: PartsProps<D>) => (
    <>
        {parts.map(part => (
            <Part<D>
                key={part.data.id}
                part={part}
                areaGenerator={areaGenerator}
                borderGenerator={borderGenerator}
            />
        ))}
    </>
)
