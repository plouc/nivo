export interface UnmappedValueFormat {
    enabled: boolean
    format: string
}

export const mapFormat = ({ format, enabled }: UnmappedValueFormat) =>
    enabled ? format : undefined
