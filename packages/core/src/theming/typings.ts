import { CSSProperties } from 'react'

export interface Theme {
    background: string
    fontFamily: string
    fontSize: number
    textColor: string
    axis: {
        domain: {
            line: CSSProperties
        }
        ticks: {
            line: CSSProperties
            text: CSSProperties
        }
        legend: {
            text: CSSProperties
        }
    }
    grid: {
        line: CSSProperties
    }
    legends: {
        text: CSSProperties
    }
    labels: {
        text: CSSProperties
    }
    markers: {
        lineColor: string
        lineStrokeWidth: number
        text: CSSProperties
    }
    dots: {
        text: CSSProperties
    }
    tooltip: {
        container: CSSProperties
        basic: CSSProperties
        chip: CSSProperties
        table: CSSProperties
        tableCell: CSSProperties
    }
    crosshair: {
        line: CSSProperties
    }
    annotations: {
        text: CSSProperties
        link: CSSProperties
        outline: CSSProperties
        symbol: CSSProperties
    }
}

export type PartialTheme = Partial<{
    background: string
    fontFamily: string
    fontSize: number
    textColor: string
    axis: Partial<{
        domain: Partial<{
            line: CSSProperties
        }>
        ticks: Partial<{
            line: CSSProperties
            text: CSSProperties
        }>
        legend: Partial<{
            text: CSSProperties
        }>
    }>
    grid: Partial<{
        line: CSSProperties
    }>
    legends: Partial<{
        text: CSSProperties
    }>
    labels: Partial<{
        text: CSSProperties
    }>
    markers: Partial<{
        lineColor: string
        lineStrokeWidth: number
        textColor: string
        fontSize: string | 0
        text: CSSProperties
    }>
    dots: Partial<{
        text: CSSProperties
    }>
    tooltip: Partial<{
        container: CSSProperties
        basic: CSSProperties
        chip: CSSProperties
        table: CSSProperties
        tableCell: CSSProperties
    }>
    crosshair: Partial<{
        line: CSSProperties
    }>
    annotations: Partial<{
        text: CSSProperties
        link: CSSProperties
        outline: CSSProperties
        symbol: CSSProperties
    }>
}>
