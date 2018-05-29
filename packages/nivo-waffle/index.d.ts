declare module '@nivo/waffle' {
    export class Waffle extends React.Component<WaffleBaseProps & WaffleCommonProps & WaffleSvgProps & MotionProps & Dimensions>{}
    export class WaffleHtml extends React.Component<WaffleBaseProps & WaffleCommonProps & MotionProps & Dimensions>{}
    export class WaffleCanvas extends React.Component<WaffleBaseProps & WaffleCommonProps & WaffleCanvasProps & Dimensions>{}
    export class ResponsiveWaffle extends React.Component<WaffleBaseProps & WaffleCommonProps & WaffleSvgProps &MotionProps>{}
    export class ResponsiveWaffleHtml extends React.Component<WaffleBaseProps & WaffleCommonProps & MotionProps>{}
    export class ResponsiveWaffleCanvas extends React.Component<WaffleBaseProps & WaffleCommonProps & WaffleCanvasProps>{}

    export type WaffleBaseProps = {
        total: number;
        data: object[];
        rows: number;
        columns: number;
    }

    export type FillDirection =
        | 'top'
        | 'right'
        | 'bottom'
        | 'left'

    export type WaffleCommonProps = Partial<{
        // layout
        margin: Box;
        fillDirection: FillDirection;
        padding: number;

        // styling
        theme: Theme;
        colors: string | string[] | Function;
        colorBy: string | Function;
        emptyColor: string;
        emptyOpacity: number;
        borderWidth: number;
        borderColor: string | Function;

        // interactivity
        isInteractive: boolean;
        tooltipFormat: string | Function;
        tooltip: Function;
        onClick: Function;
    }>

    export type WaffleSvgProps = Partial<{
        defs: Array<{ id: string }>;
        fill: Array<{ id?: string, match: object | Function | '*' }>;
    }>

    export type WaffleCanvasProps = Partial<{
        pixelRatio: number;
    }>

    export type MotionProps = Partial<{
        animate: boolean;
        motionDamping: number;
        motionStiffness: number;
    }>

    export type Box = Partial<{
        bottom: number;
        left: number;
        right: number;
        top: number;
    }>

    export type Theme = Partial<{
        tooltip: Partial<{
            basic: React.CSSProperties;
            container: React.CSSProperties;
        }>;
        labels: React.CSSProperties;
    }>

    export type Dimensions = {
        height: number;
        width: number;
    }
}
