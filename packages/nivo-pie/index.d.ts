declare module '@nivo/pie' {

    interface INivoLegendItem {

        data: Array<{ label: string | number; fill: string; }>;

        // position & layout
        anchor: 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left' | 'top-left' | 'center';

        translateX?: number;
        translateY?: number;
        direction: 'row' | 'column';

        // items
        itemWidth: number;
        itemHeight: number;
        itemDirection?: 'left-to-right' | 'right-to-left' | 'top-to-bottom' | 'bottom-to-top',
        itemsSpacing?: number;
        symbolSize?: number;
        symbolSpacing?: number;
        symbolShape: "circle" | "diamond" | "square" | "triangle", //Proptypes specifies this as string | func but source implements it as string only.
        textColor?: string;
    }

    interface IPieDataItem {
        id: string;
        value: string;
    }

    type SettingsGetterFunc = (dataSlize: IPieDataITem) => string;

    interface IPieProps {
        data: Array<IPieDataItem>;
        sortByValue: bool;
        innerRadius: number;
        padAngle: number;
        cornerRadius: number;

        // border
        borderWidth: number;
        borderColor?: string | SettingsGetterFunc;

        // radial labels
        enableRadialLabels: bool;
        radialLabel?: string | SettingsGetterFunc;
        radialLabelsSkipAngle?: number;
        radialLabelsTextXOffset?: number;
        radialLabelsTextColor?: string | SettingsGetterFunc;
        radialLabelsLinkOffset?: number;
        radialLabelsLinkDiagonalLength?: number;
        radialLabelsLinkHorizontalLength?: number;
        radialLabelsLinkStrokeWidth?: number;
        radialLabelsLinkColor?: string | SettingsGetterFunc;

        // slices labels
        enableSlicesLabels: bool;
        sliceLabel?: string | SettingsGetterFunc;
        slicesLabelsSkipAngle?: number;
        slicesLabelsTextColor?: string | SettingsGetterFunc;

        // styling


        isInteractive?: bool;
        onClick: (dataSlize: IPieDataITem, event: React.MouseEvent<SVGPathElement>) => void;
        //tooltipFormat?: string | SettingsGetterFunc; No docs, no usage in source

        legends: Array<INivoLegendItem>;
    }

    export class Pie extends React.Component<HeatMapTypes>{

    }

    export class ResponsivePie extends Pie {

    }
}