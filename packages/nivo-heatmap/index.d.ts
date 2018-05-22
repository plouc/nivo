declare module '@nivo/heatmap' {
    export class ResponsiveHeatMapCanvas extends React.Component<HeatMapTypes>{

    }

    export class HeatMapCanvas extends React.Component<HeatMapTypes & Dimensions>{

    }

    export class ResponsiveHeatMap extends React.Component<HeatMapTypes>{

    }

    export class HeatMap extends React.Component<HeatMapTypes & Dimensions>{

    }

    export type HeatMapTypes = {
        //data
        data: Array<object>;
        indexBy?: string | Function;
        keys?: Array<string>;

        minValue?: number | 'auto';
        maxValue?: number | 'auto';

        forceSquare?: boolean;
        sizeVariation?: number;
        padding?: number;

        //cells
        cellShape?: 'rect'| 'circle' | Function;
        cellOpacity?: number;
        cellBorderWidth?: number;
        cellBorderColor?: string | Function;
        
        //axes & grid
        axisTop?: Axis;
        axisRight?: Axis;
        axisBottom?: Axis;
        axisLeft?: Axis;
        enableGridX?: boolean;
        enableGridY?: boolean;

        //labels
        enableLabels?: boolean;
        labelTextColor?: string | Function;

        //theming
        colors?: string | Function | Array<string>;

        //interactivity
        isInteractive?: boolean;
        onClick?: Function;
        hoverTarget?: 'cell' | 'row' | 'column' | 'rowColumn';
        cellHoverOpacity?: number;
        cellHoverOthersOpacity?: number;
        tooltipFormat?: string | Function;

        animate?: boolean;
        motionStiffness?: number;
        motionDamping?: number;
        margin?: Margin;
    }

    export type NodeData = {
        key: string;
        value: number;
        x: number;
        xKey: string | number;
        y: number;
        yKey: string | number;
        width: number;
        height: number;
        opacity: number;
    }

    export type Axis = {
        orient?: string;
        legend?: string;
        tickSize?: number;
        tickPadding?: number;
        tickRotation?: number;
        legendOffset?: number;
        legendPosition?: string;
    }

    export type Margin = {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    }

    interface Dimensions {
        width: number;
        height: number;
    }
}