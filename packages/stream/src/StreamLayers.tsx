import { InheritedColorConfigCustomFunction } from '@bitbloom/nivo-colors'
import { StreamLayer } from './StreamLayer'
import { StreamCommonProps, StreamLayerData, StreamDatum } from './types'

interface StreamLayersProps<RawDatum extends StreamDatum> {
    layers: StreamLayerData[]
    fillOpacity: number
    borderWidth: number
    getBorderColor: InheritedColorConfigCustomFunction<StreamLayerData>
    isInteractive: boolean
    tooltip: StreamCommonProps<RawDatum>['tooltip']
}

export const StreamLayers = <RawDatum extends StreamDatum>({
    layers,
    fillOpacity,
    borderWidth,
    getBorderColor,
    isInteractive,
    tooltip,
}: StreamLayersProps<RawDatum>) => (
    <g>
        {layers.map((layer, i) => (
            <StreamLayer<RawDatum>
                key={i}
                layer={layer}
                getBorderColor={getBorderColor}
                borderWidth={borderWidth}
                fillOpacity={fillOpacity}
                isInteractive={isInteractive}
                tooltip={tooltip}
            />
        ))}
    </g>
)
