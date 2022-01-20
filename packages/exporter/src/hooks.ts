import { useCallback, useRef, MutableRefObject } from 'react'
import { getSvgElement, exportSvgToSvg, exportSvgToImage } from './export'

export const useSvgExporter = (
    name: string,
    format = 'png',
    dpr = 2
): [
    ref: MutableRefObject<HTMLElement | null>,
    exportToSvg: () => void,
    exportToImage: () => void
] => {
    const ref = useRef<HTMLElement | null>(null)

    const exportToSvg = useCallback(() => {
        if (ref.current === null) return

        const svg = getSvgElement(ref.current)
        if (svg === null) return

        exportSvgToSvg(svg, name)
    }, [ref, name])

    const exportToCanvas = useCallback(() => {
        if (ref.current === null) return

        const svg = getSvgElement(ref.current)
        if (svg === null) return

        exportSvgToImage(svg, name, format, dpr)
    }, [ref, name, format, dpr])

    return [ref, exportToSvg, exportToCanvas]
}
