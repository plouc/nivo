import { InheritedColorConfigCustomFunction } from '@nivo/colors'
import { StreamLayer } from './StreamLayer'
import { StreamLayerData } from './types'

interface StreamLayersProps {
    layers: StreamLayerData[]
    fillOpacity: number
    borderWidth: number
    getBorderColor: InheritedColorConfigCustomFunction<StreamLayerData>
    isInteractive: boolean
}

export const StreamLayers = ({
    layers,
    fillOpacity,
    borderWidth,
    getBorderColor,
    isInteractive,
}: StreamLayersProps) => (
    <g>
        {layers.map((layer, i) => (
            <StreamLayer
                key={i}
                layer={layer}
                getBorderColor={getBorderColor}
                borderWidth={borderWidth}
                fillOpacity={fillOpacity}
                isInteractive={isInteractive}
            />
        ))}
    </g>
)
