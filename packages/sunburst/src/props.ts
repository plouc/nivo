export type DefaultSunburstProps = Required<typeof defaultProps>

export const defaultProps = {
    identity: 'id',
    value: 'value',

    cornerRadius: 0,

    colors: { scheme: 'nivo' },
    borderWidth: 1,
    borderColor: 'white',

    childColor: { from: 'color' },
    role: 'img',

    // slices labels
    enableSlicesLabels: false,
    sliceLabel: 'value',
    slicesLabelsTextColor: { theme: 'labels.text.fill' },

    isInteractive: true,
}
