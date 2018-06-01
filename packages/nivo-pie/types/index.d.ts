declare module '@nivo/pie' {
    import * as React from 'react';
    import * as CSS from 'csstype';

    export class Pie extends React.Component<Data & PieProps & Dimensions>{ }
    export class ResponsivePie extends React.Component<Data & PieProps>{ }

    export type LegendItemDirection =
        | 'left-to-right'
        | 'right-to-left'
        | 'top-to-bottom'
        | 'bottom-to-top';

    export type Anchor =
        | 'top'
        | 'top-right'
        | 'right'
        | 'bottom-right'
        | 'bottom'
        | 'bottom-left'
        | 'left'
        | 'top-left'
        | 'center';

    export type LegendDirection = 'row' | 'column';

    export type Legend = {

        data?: Array<{ id: string | number; value: number; }>; //injected

        // position & layout
        anchor: Anchor;

        translateX?: number; // default 0
        translateY?: number; // default 0
        direction: LegendDirection;

        // items
        itemWidth: number;
        itemHeight: number;
        itemDirection?: LegendItemDirection; // default left-to-right
        itemsSpacing?: number; // default 0
        symbolSize?: number; // default 16
        symbolSpacing?: number; // default 8
        symbolShape?: "circle" | "diamond" | "square" | "triangle", // default square
        textColor?: string; // default black
    }

    export interface PieDataItem {
        id: string;
        value: number;
    }
 
    export type SettingsGetterFunc = (dataSlize: PieDataItem) => string;

    export type Data = { data: Array<PieDataItem> };

    export type PieProps = Partial<{
        sortByValue: boolean;
        innerRadius: number;
        padAngle: number;
        cornerRadius: number;

        // border
        borderWidth: number;
        borderColor: string | SettingsGetterFunc;

        // radial labels
        enableRadialLabels: boolean;
        radialLabel: string | SettingsGetterFunc;
        radialLabelsSkipAngle: number;
        radialLabelsTextXOffset: number;
        radialLabelsTextColor: string | SettingsGetterFunc;
        radialLabelsLinkOffset: number;
        radialLabelsLinkDiagonalLength: number;
        radialLabelsLinkHorizontalLength: number;
        radialLabelsLinkStrokeWidth: number;
        radialLabelsLinkColor: string | SettingsGetterFunc;

        // slices labels
        enableSlicesLabels: boolean;
        sliceLabel: string | SettingsGetterFunc;
        slicesLabelsSkipAngle: number;
        slicesLabelsTextColor: string | SettingsGetterFunc;


        colors: string | string[] | Function;
        colorBy: string | Function;

        margin: Box;


        isInteractive: boolean;
        onClick: (dataSlize: PieDataItem, event: React.MouseEvent<SVGPathElement>) => void;
        tooltipFormat: string | Function;
        tooltip: Function;

        theme: Theme;

        legends: Array<Legend>;

        // motion
        animate: boolean;
        motionDamping: number;
        motionStiffness: number;
    }>;

    export interface Dimensions {
        height: number;
        width: number;
    }

    export type Theme = Partial<{
        axis: Partial<{
            textColor: CSS.ColorProperty;
            fontSize: CSS.FontSizeProperty<string | 0>;
            tickColor: CSS.ColorProperty;
            legendColor: CSS.ColorProperty;
            legendFontSize: CSS.FontSizeProperty<string | 0>;
        }>,
        grid: Partial<{
            stroke: CSS.ColorProperty;
            strokeWidth: number
            strokeDasharray: string;
        }>,
        markers: Partial<{
            lineColor: CSS.ColorProperty;
            lineStrokeWidth: number;
            textColor: CSS.ColorProperty;
            fontSize: CSS.FontSizeProperty<string | 0>;
        }>,
        dots: Partial<{
            textColor: CSS.ColorProperty;
            fontSize: CSS.FontSizeProperty<string | 0>;
        }>,
        tooltip: Partial<{
            container: Partial<{
                background: CSS.ColorProperty;
                color: CSS.ColorProperty;
                fontSize: CSS.FontSizeProperty<string | 0>;
                borderRadius: CSS.BorderRadiusProperty<string | 0>;
                boxShadow: CSS.BoxShadowProperty;
                padding: CSS.PaddingProperty<string | 0>;
            }>,
            basic: Partial<{
                whiteSpace: CSS.WhiteSpaceProperty;
                display: CSS.DisplayProperty;
                alignItems: CSS.AlignItemsProperty;
            }>,
            table: any;
            tableCell: {
                padding: CSS.PaddingProperty<string | 0>;
            }
        }>,
        labels: { textColor: CSS.ColorProperty; };
        sankey: {
            label: any
        }
    }>

    export type Box = Partial<{
        bottom: number;
        left: number;
        right: number;
        top: number;
    }>
}