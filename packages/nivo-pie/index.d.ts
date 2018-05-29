declare module '@nivo/pie' {
    export class Pie extends React.Component<PieProps & Dimensions>{}
    export class ResponsivePie extends React.Component<PieProps>{}

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

        data: Array<{ label: string | number; fill: string; }>;

        // position & layout
        anchor: Anchor;

        translateX: number; // default 0
        translateY: number; // default 0
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
        value: string;
    }

    export type SettingsGetterFunc = (dataSlize: PieDataItem) => string;

    export type PieProps = Partial<{
        data: Array<PieDataItem>;
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
        // tooltipFormat?: string | SettingsGetterFunc; No docs, no usage in source

        theme: Theme;

        legends: Array<Legend>;
    }>;

    export interface Dimensions{
        height: number;
        width: number;
    }

    export type Theme = Partial<{
        axis: React.CSSProperties;
        grid: React.CSSProperties;
        markers: React.CSSProperties;
        dots: React.CSSProperties;
        tooltip: Partial<{
            basic: React.CSSProperties;
            container: React.CSSProperties;
            table: React.CSSProperties;
            tableCell: React.CSSProperties;
        }>;
        labels: React.CSSProperties;
        sankey: Partial<{ label: React.CSSProperties }>;
    }>

    export type Box = Partial<{
        bottom: number;
        left: number;
        right: number;
        top: number;
    }>
}