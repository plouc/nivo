export type Vertex = [number, number]

export interface BoundingBox {
    top: number
    right: number
    bottom: number
    left: number
}

/**
 * `fillDirection` affects order of the cells when generating a grid.
 *
 * ```
 * │   top             │   right           │   bottom          │   left            │
 * │                   │                   │   ↓               │                   │
 * │   8 ─── 7 ─── 6   │ → 0  ╭─ 3  ╭─ 6   │   0 ─── 1 ─── 2   │   8  ╭─ 5  ╭─ 2   │
 * │   ╭───────────╯   │   │  │  │  │  │   │   ╭───────────╯   │   │  │  │  │  │   │
 * │   5 ─── 4 ─── 3   │   1  │  4  │  7   │   3 ─── 4 ─── 5   │   5  │  4  │  1   │
 * │   ╭───────────╯   │   │  │  │  │  │   │   ╭───────────╯   │   │  │  │  │  │   │
 * │   2 ─── 1 ─── 0   │   2 ─╯  5 ─╯  8   │   6 ─── 7 ─── 8   │   6 ─╯  3 ─╯  0 ← │
 * │               ↑   │                   │                   │                   │
 * ```
 */
export type GridFillDirection = 'top' | 'right' | 'bottom' | 'left'

export interface GridCell {
    // `column.row`
    key: string
    index: number
    column: number
    row: number
    x: number
    y: number
    width: number
    height: number
}
