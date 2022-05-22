export type TextProps = {
    align: {
        left: string
        center: string
        right: string
        start: string
        middle: string
        end: string
    }
    baseline: {
        top: string
        center: string
        bottom: string
    }
}

export type EngineToTextProps = {
    svg: TextProps
    canvas: TextProps
}

export type MatchPredicate = '*' | ((d: Object) => boolean) | Object

export type RuleSpec = {
    id: string
    match: MatchPredicate
}
