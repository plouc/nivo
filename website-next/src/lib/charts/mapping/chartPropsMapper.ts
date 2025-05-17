import omit from 'lodash/omit.js'

type OptionalKeys<T> = {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    [K in keyof T]: {} extends Pick<T, K> ? K : never
}[keyof T]

type RequiredKeys<T> = Exclude<keyof T, OptionalKeys<T>>

type MergeChartProps<
    MappedProps extends Record<string, unknown>,
    Overrides extends Record<string, unknown>,
> =
    // Required keys from Overrides (override MappedProps)
    {
        [K in keyof Overrides & RequiredKeys<Overrides>]: Overrides[K]
    } & {
        // Optional keys from Overrides (override MappedProps)
        [K in keyof Overrides & OptionalKeys<Overrides>]?: Overrides[K]
    } & {
        // Remaining required keys from MappedProps
        [K in Exclude<RequiredKeys<MappedProps>, keyof Overrides>]: MappedProps[K]
    } & { [K in Exclude<OptionalKeys<MappedProps>, keyof Overrides>]?: MappedProps[K] } // Remaining optional keys from FinalSettings


export type UnmappedChartProps<
    MappedProps extends Record<string, unknown>,
    Overrides extends Record<string, unknown>,
    Without extends keyof MappedProps = never,
> = Omit<MergeChartProps<MappedProps, Overrides>, Without>

type ChartPropMapper<UnmappedProps, MappedProps, Data, Key extends keyof MappedProps> = (
    value: Key extends keyof UnmappedProps ? UnmappedProps[Key] : undefined,
    unmappedProps: UnmappedProps,
    data: Data
) => MappedProps[Key]

type ChartPropsMappers<UnmappedProps, MappedProps, Data> = Partial<{
    [Key in keyof MappedProps]: ChartPropMapper<UnmappedProps, MappedProps, Data, Key>
}>

/**
 * Transforms raw properties into mapped properties using a set of mappers.
 *
 * Excluding is typically used when we have some properties defined
 * in the raw settings object that we don't want to pass to the final settings object,
 * like `enable*` properties.
 */
export const chartPropsMapper =
    <
        UnmappedProps extends Record<string, unknown>,
        MappedProps extends Record<string, unknown>,
        Data = unknown,
    >(
        mapping: ChartPropsMappers<UnmappedProps, MappedProps, Data>,
        { exclude = [] }: { exclude?: (keyof UnmappedProps)[] } = {}
    ): ((rawSettings: UnmappedProps, data: Data) => MappedProps) =>
    (rawSettings: UnmappedProps, data: Data): MappedProps => {
        const overrides: Partial<MappedProps> = {}

        for (const key in mapping) {
            if (mapping.hasOwnProperty(key)) {
                const mapper = mapping[key]
                if (mapper) {
                    const rawValue = rawSettings[key as keyof UnmappedProps]
                    overrides[key as keyof MappedProps] = mapper(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        rawValue as any,
                        rawSettings,
                        data
                    ) as MappedProps[typeof key]
                }
            }
        }

        return {
            ...omit(rawSettings, exclude),
            ...overrides,
        } as MappedProps
    }
