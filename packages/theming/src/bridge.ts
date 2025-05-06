import { TextStyle } from './types'

export type Engine = 'svg' | 'css' | 'canvas'

export type TextAlign = 'start' | 'center' | 'end'
export type TextBaseline = 'top' | 'center' | 'bottom'

export interface EngineStyleAttributesMapping {
    textAlign: Record<TextAlign, string>
    textBaseline: Record<TextBaseline, string>
}

export const svgStyleAttributesMapping: EngineStyleAttributesMapping = {
    textAlign: {
        start: 'start',
        center: 'middle',
        end: 'end',
    },
    textBaseline: {
        top: 'text-before-edge',
        center: 'central',
        bottom: 'alphabetic',
    },
}

export const cssStyleAttributesMapping: EngineStyleAttributesMapping = {
    textAlign: {
        start: 'left',
        center: 'center',
        end: 'right',
    },
    textBaseline: {
        top: 'top',
        center: 'middle',
        bottom: 'bottom',
    },
}

export const canvasStyleAttributesMapping: EngineStyleAttributesMapping = {
    textAlign: {
        start: 'left',
        center: 'center',
        end: 'right',
    },
    textBaseline: {
        top: 'top',
        center: 'middle',
        bottom: 'bottom',
    },
}

export const styleAttributesMapping: Record<Engine, EngineStyleAttributesMapping> = {
    svg: svgStyleAttributesMapping,
    css: cssStyleAttributesMapping,
    canvas: canvasStyleAttributesMapping,
}

export const convertStyleAttribute = <K extends keyof EngineStyleAttributesMapping>(
    engine: Engine,
    attr: K,
    value: keyof EngineStyleAttributesMapping[K]
) => {
    return styleAttributesMapping[engine][attr][value]
}

export const sanitizeSvgTextStyle = (
    style: TextStyle
): Omit<TextStyle, 'outlineWidth' | 'outlineColor' | 'outlineOpacity'> => {
    const { outlineWidth, outlineColor, outlineOpacity, ...sanitized } = style

    return sanitized
}

export const sanitizeHtmlTextStyle = (
    style: TextStyle
): Omit<TextStyle, 'outlineWidth' | 'outlineColor' | 'outlineOpacity' | 'fill'> => {
    const { fill, outlineWidth, outlineColor, outlineOpacity, ...sanitized } = style

    return {
        ...sanitized,
        color: fill,
    }
}
