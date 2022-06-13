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

export type MatchPredicate<T> = '*' | ((d: T) => boolean) | Record<string, unknown>

export type RuleSpec<T> = {
    id: string
    match: MatchPredicate<T>
}

export type NumberDatum = number | { valueOf(): number }

export type DatumPropertyAccessor<Datum, Value> = (datum: Datum) => Value

export type PropertyAccessor<Datum, Value> =
    // path to use with `lodash.get()`
    | string
    // explicit accessor function
    | DatumPropertyAccessor<Datum, Value>

// this is very similar to the PropertyAccessor, but provided for backward compatibility
export type ValueFormat<Value> =
    | string // d3 formatter
    | ((value: Value) => string)
