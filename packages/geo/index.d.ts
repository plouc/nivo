import * as React from 'react'
import { Dimensions, Theme, Box, BoxAlign } from '@nivo/core'

declare module '@nivo/geo' {
    ///////////////////////////////////////////////////////////////////////////
    // Common
    ///////////////////////////////////////////////////////////////////////////

    export type GeoProjectionType =
        | 'azimuthalEqualArea'
        | 'azimuthalEquidistant'
        | 'gnomonic'
        | 'orthographic'
        | 'stereographic'
        | 'equalEarth'
        | 'equirectangular'
        | 'mercator'
        | 'transverseMercator'
        | 'naturalEarth1'

    type FeatureAccessor<F, T> = (feature: F) => T

    interface CommonProps {
        features: any[]

        margin?: Partial<Box>

        projectionType?: GeoProjectionType
        projectionScale?: number
        projectionTranslation?: [number, number]
        projectionRotation?: [number, number, number]

        enableGraticule?: boolean
        graticuleLineWidth?: number
        graticuleLineColor?: string

        isInteractive?: boolean

        theme?: Partial<Theme>
    }

    ///////////////////////////////////////////////////////////////////////////
    // GeoMap
    ///////////////////////////////////////////////////////////////////////////

    export type GeoMapTooltip = React.FunctionComponent<{
        feature: any
    }>

    export type GeoMapEventHandler = (feature: any, event: React.MouseEvent<any>) => void

    interface GeoMapCommonProps extends CommonProps {
        fillColor?: string | FeatureAccessor<any, string>
        borderWidth?: number | FeatureAccessor<any, number>
        borderColor?: string | FeatureAccessor<any, number>

        onMouseEnter?: GeoMapEventHandler
        onMouseMove?: GeoMapEventHandler
        onMouseLeave?: GeoMapEventHandler
        onClick?: GeoMapEventHandler

        tooltip?: GeoMapTooltip
    }

    export interface GeoMapProps extends GeoMapCommonProps {}
    export interface GeoMapCanvasProps extends GeoMapCommonProps {
        pixelRatio?: number
    }

    export class GeoMap extends React.Component<GeoMapProps & Dimensions> {}
    export class ResponsiveGeoMap extends React.Component<GeoMapProps> {}
    export class GeoMapCanvas extends React.Component<GeoMapCanvasProps & Dimensions> {}
    export class ResponsiveGeoMapCanvas extends React.Component<GeoMapCanvasProps> {}

    ///////////////////////////////////////////////////////////////////////////
    // Choropleth
    ///////////////////////////////////////////////////////////////////////////

    export interface ChoroplethBoundFeature {
        label: string
        value: number
        formattedValue: 'string | number'
        color: string
        data: any
    }

    export type ChoroplethEventHandler = (
        feature: ChoroplethBoundFeature,
        event: React.MouseEvent<any>
    ) => void

    export type ChoroplethTooltip = React.FunctionComponent<{
        feature: ChoroplethBoundFeature
    }>

    type DatumMatcher = (...args: any[]) => boolean

    interface ChoroplethCommonProps extends CommonProps {
        data: any[]
        domain: number[]

        match?: string | DatumMatcher
        label?: string | FeatureAccessor<any, string>
        value?: string | FeatureAccessor<any, number>
        valueFormat?: string | FeatureAccessor<any, string | number>
        colors?: string | string[] | FeatureAccessor<any, string>
        unknownColor?: string

        fillColor?: string | FeatureAccessor<ChoroplethBoundFeature, string>
        borderWidth?: number | FeatureAccessor<ChoroplethBoundFeature, number>
        borderColor?: string | FeatureAccessor<ChoroplethBoundFeature, number>

        tooltip?: ChoroplethTooltip

        onMouseEnter?: ChoroplethEventHandler
        onMouseMove?: ChoroplethEventHandler
        onMouseLeave?: ChoroplethEventHandler
        onClick?: ChoroplethEventHandler
    }

    export interface ChoroplethProps extends ChoroplethCommonProps {}
    export interface ChoroplethCanvasProps extends ChoroplethCommonProps {
        pixelRatio?: number
    }

    export class Choropleth extends React.Component<ChoroplethProps & Dimensions> {}
    export class ResponsiveChoropleth extends React.Component<ChoroplethProps> {}
    export class ChoroplethCanvas extends React.Component<ChoroplethCanvasProps & Dimensions> {}
    export class ResponsiveChoroplethCanvas extends React.Component<ChoroplethCanvasProps> {}
}
