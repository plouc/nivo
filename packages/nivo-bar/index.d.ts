declare module '@nivo/bar' {
    export class Bar extends React.Component<Data & BarProps & Dimensions>{}
    export class BarCanvas extends React.Component<Data & BarProps & Dimensions>{}
    export class ResponsiveBar extends React.Component<Data & BarProps>{}
    export class ResponsiveBarCanvas extends React.Component<Data & BarProps>{}

    export type Data = {
        data: object[];
    }

    export type BarProps = Partial<{
        indexBy: string | Function;
        keys: string[];

        groupMode: 'stacked' | 'grouped';
        layout: 'horizontal' | 'vertical';
        reverse: boolean;

        innerPadding: number;
        minValue: number | 'auto';
        margin: Box;
        maxValue: number | 'auto';
        padding: number;

        // axes & grid
        axisBottom: Axis;
        axisLeft: Axis;
        axisRight: Axis;
        axisTop: Axis;
        enableGridX: boolean;
        enableGridY: boolean;

        // customization
        barComponent: Function;
        colors: string | string[] | Function;
        colorBy: string | Function;

        // labels
        enableLabel: boolean;
        label: string | Function;
        labelFormat: string | Function;
        labelLinkColor: string | Function;
        labelSkipWidth: number;
        labelSkipHeight: number;
        labelTextColor: string | Function;

        // theming
        borderRadius: number;
        borderWidth: number;
        defs: Array<{ id: string }>;
        fill: Array<{ id?: string, match: object | Function | '*' }>;
        theme: Theme;

        // interactivity
        isInteractive: boolean;
        onClick: Function;
        tooltip: Function;
        tooltipFormat: string | Function;

        // motion
        animate: boolean;
        motionDamping: number;
        motionStiffness: number;

        legends: Array<{ dataFrom: 'indexes' | 'keys' } & Legend>;

        // canvas specific
        pixelRatio: number;
    }>

    export type Axis = Partial<{
        format: string | Function;
        legend: string;
        legendOffset: number;
        legendPosition: 'start' | 'center' | 'end';
        orient: 'top' | 'right' | 'bottom' | 'left';
        tickCount: number;
        tickPadding: number;
        tickRotation: number;
        tickSize: number;
        tickValues: (string | number)[];
    }>

    export type Legend = {
        // position & layout
        anchor: Anchor;
        direction: LegendDirection;
        justify: boolean;
        padding: number | Box;
        translateX: number;
        translateY: number;

        // items
        itemWidth: number;
        itemHeight: number;
        itemDirection: LegendItemDirection;
        itemsSpacing: number;
        symbolSize: number;
        symbolSpacing: number;
        symbolShape: string | Function;
        textColor: string;
    }

    export type Anchor =
        | 'top'
        | 'top-right'
        | 'right'
        | 'bottom-right'
        | 'bottom'
        | 'bottom-left'
        | 'left'
        | 'top-left'
        | 'center'

    export type LegendDirection = 'row' | 'column'

    export type LegendItemDirection =
        | 'left-to-right'
        | 'right-to-left'
        | 'top-to-bottom'
        | 'bottom-to-top'

    export type Box = Partial<{
        bottom: number;
        left: number;
        right: number;
        top: number;
    }>

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

    interface Dimensions {
        height: number;
        width: number;
    }
}
