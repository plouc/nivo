import omit from 'lodash/omit.js'
import { AxisProps, CanvasAxisProps } from '@nivo/axes'

type OptionalKeys<T> = {
    [K in keyof T]: {} extends Pick<T, K> ? K : never
}[keyof T]

type RequiredKeys<T> = Exclude<keyof T, OptionalKeys<T>>

type MergeSettings<
    FinalSettings extends Record<string, any>,
    Overrides extends Record<string, any>,
> =
    // Required keys from Overrides (override FinalSettings)
    {
        [K in keyof Overrides & RequiredKeys<Overrides>]: Overrides[K]
    } & {
        // Optional keys from Overrides (override FinalSettings)
        [K in keyof Overrides & OptionalKeys<Overrides>]?: Overrides[K]
    } & {
        // Remaining required keys from FinalSettings
        [K in Exclude<RequiredKeys<FinalSettings>, keyof Overrides>]: FinalSettings[K]
    } & { [K in Exclude<OptionalKeys<FinalSettings>, keyof Overrides>]?: FinalSettings[K] } // Remaining optional keys from FinalSettings

export type UnmappedSettings<
    FinalSettings extends Record<string, any>,
    Overrides extends Record<string, any>,
    Without extends keyof FinalSettings = never,
> = Omit<MergeSettings<FinalSettings, Overrides>, Without>

type Mapper<RawSettings, FinalSettings, Data, Key extends keyof FinalSettings> = (
    value: Key extends keyof RawSettings ? RawSettings[Key] : undefined,
    rawSettings: RawSettings,
    data: Data
) => FinalSettings[Key]

type Mappers<RawSettings, FinalSettings, Data> = Partial<{
    [Key in keyof FinalSettings]: Mapper<RawSettings, FinalSettings, Data, Key>
}>

/**
 * Transforms raw settings into mapped settings using a set of mappers.
 *
 * Excluding is typically used when we have some properties defined
 * in the raw settings object that we don't want to pass to the final settings object,
 * like `enable*` properties.
 */
export const settingsMapper =
    <
        RawSettings extends Record<string, any>,
        FinalSettings extends Record<string, any>,
        Data = unknown,
    >(
        mapping: Mappers<RawSettings, FinalSettings, Data>,
        { exclude = [] }: { exclude?: (keyof RawSettings)[] } = {}
    ): ((rawSettings: RawSettings, data: Data) => FinalSettings) =>
    (rawSettings: RawSettings, data: Data): FinalSettings => {
        const overrides: Partial<FinalSettings> = {}

        for (const key in mapping) {
            if (mapping.hasOwnProperty(key)) {
                const mapper = mapping[key]
                if (mapper) {
                    const rawValue = rawSettings[key as keyof RawSettings]
                    overrides[key as keyof FinalSettings] = mapper(
                        rawValue,
                        rawSettings,
                        data
                    ) as FinalSettings[typeof key]
                }
            }
        }

        return {
            ...omit(rawSettings, exclude),
            ...overrides,
        } as FinalSettings
    }

export type AxisWithToggle<Axis extends AxisProps | CanvasAxisProps> = NonNullable<Axis> & {
    enable: boolean
}
