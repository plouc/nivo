import { ArcGenerator, ArcsLayer, ArcTransitionMode } from '@nivo/arcs'
import { RadialBarTrackDatum } from './types'

interface RadialBarTracksProps {
    center: [number, number]
    tracks: RadialBarTrackDatum[]
    arcGenerator: ArcGenerator
    transitionMode: ArcTransitionMode
}

export const RadialBarTracks = ({
    center,
    tracks,
    arcGenerator,
    transitionMode,
}: RadialBarTracksProps) => {
    return (
        <ArcsLayer<RadialBarTrackDatum>
            center={center}
            data={tracks}
            arcGenerator={arcGenerator}
            borderWidth={0}
            borderColor="none"
            transitionMode={transitionMode}
        />
    )
}
