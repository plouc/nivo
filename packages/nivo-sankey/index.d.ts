import * as React from 'react'

declare module '@nivo/sankey' {
  export class Sankey extends React.Component<Data & SankeyProps & Dimensions>{}
  export class ResponsiveSankey extends React.Component<Data & SankeyProps>{}

  export type SankeyDataNode = {
    id: string | number
  }

  export type SankeyDataLink = {
    source: string | number
    target: string | number
  }

  export type Data = {
    data: {
      nodes: SankeyDataNode[]
      links: SankeyDataLink[]
    }
  }

  export type CssMixBlendMode =
    | 'normal'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'color-dodge'
    | 'color-burn'
    | 'hard-light'
    | 'soft-light'
    | 'difference'
    | 'exclusion'
    | 'hue'
    | 'saturation'
    | 'color'
    | 'luminosity'

  export type SankeyProps = Partial<{
    align: 'center' | 'justify' | 'left' | 'right'

    // nodes
    nodeOpacity: number
    nodeHoverOpacity: number
    nodeHoverOthersOpacity: number
    nodeWidth: number
    nodePaddingX: number
    nodePaddingY: number
    nodeBorderWidth: number
    nodeBorderColor: string | Function

    // links
    linkOpacity: number
    linkHoverOpacity: number
    linkHoverOthersOpacity: number
    linkContract: number
    linkBlendMode: CssMixBlendMode
    enableLinkGradient: boolean

    // labels
    enableLabels: boolean
    label: string | Function
    labelPosition: 'inside' | 'outside'
    labelPadding: number
    labelOrientation: 'horizontal' | 'vertical'
    labelTextColor: string | Function
    labelFormat: string | Function

    // interactivity
    isInteractive: boolean
    onClick: Function
    tooltipFormat: string | Function
    nodeTooltip: Function
    linkTooltip: Function

    theme: Theme

    legends: Legend[]
  }>

  export type LegendAnchor =
    | 'top'
    | 'top-right'
    | 'right'
    | 'bottom-right'
    | 'bottom'
    | 'bottom-left'
    | 'left'
    | 'top-left'
    | 'center'

  export type Legend = {
    // position & layout
    anchor: LegendAnchor
    direction: 'row' | 'column'
    justify: boolean
    padding: number | Box
    translateX: number
    translateY: number

    // items
    itemWidth: number
    itemHeight: number
    itemDirection: 'left-to-right' | 'right-to-left' | 'top-to-bottom' | 'bottom-to-top'
    itemsSpacing: number
    symbolSize: number
    symbolSpacing: number
    symbolShape: string | Function
    textColor: string
  }

  export type Box = Partial<{
    bottom: number
    left: number
    right: number
    top: number
  }>

  export type Theme = Partial<{
    axis: React.CSSProperties
    grid: React.CSSProperties
    markers: React.CSSProperties
    dots: React.CSSProperties
    tooltip: Partial<{
      basic: React.CSSProperties
      container: React.CSSProperties
      table: React.CSSProperties
      tableCell: React.CSSProperties
    }>
    labels: React.CSSProperties
    sankey: Partial<{ label: React.CSSProperties }>
  }>

  interface Dimensions {
    height: number
    width: number
  }
}
