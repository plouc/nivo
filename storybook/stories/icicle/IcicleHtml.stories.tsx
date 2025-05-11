import type { Meta, StoryObj } from '@storybook/react'
import { generateLibTree } from '@nivo/generators'
import { IcicleHtml, IcicleHtmlProps, htmlDefaultProps } from '@nivo/icicle'
import { BonsaiIcicle } from './BonsaisIcicle'
import { useKeyLoggerRef, KeyLogger } from '../internal/KeyLogger'
import {
    KeyboardNavigationContainer,
    KeyboardDoc,
    playKeyboardNavigationDemo,
    SUPPORTED_KEYBOARD_KEYS,
} from './shared'

interface RawDatum {
    name: string
    loc: number
    color: string
}

const commonProperties: IcicleHtmlProps<RawDatum> = {
    width: 900,
    height: 500,
    data: generateLibTree() as any,
    identity: 'name',
    value: 'loc',
    enableLabels: true,
    label: 'id',
    labelTextColor: { from: 'color', modifiers: [['darker', 0.6]] },
    labelSkipWidth: 32,
    labelSkipHeight: 32,
    theme: {
        labels: {
            text: {
                fontSize: 11,
                fontWeight: 600,
                outlineWidth: 1,
                outlineColor: '#ffffff',
                outlineOpacity: 1,
            },
        },
    },
}

const meta: Meta<typeof IcicleHtml> = {
    title: 'IcicleHtml',
    component: IcicleHtml,
    tags: ['autodocs'],
    argTypes: {
        orientation: {
            control: 'select',
            options: ['top', 'right', 'bottom', 'left'],
        },
    },
    args: {
        orientation: htmlDefaultProps.orientation,
    },
}

export default meta
type Story = StoryObj<typeof IcicleHtml>

export const Basic: Story = {
    render: args => <IcicleHtml<RawDatum> {...commonProperties} orientation={args.orientation} />,
}

const customPalette = ['#ffd700', '#ffb14e', '#fa8775', '#ea5f94', '#cd34b5', '#9d02d7', '#0000ff']

export const CustomColors: Story = {
    render: args => (
        <IcicleHtml<RawDatum>
            {...commonProperties}
            orientation={args.orientation}
            colors={customPalette}
        />
    ),
}

export const ColorPickedFromData: Story = {
    render: args => (
        <IcicleHtml<RawDatum>
            {...commonProperties}
            orientation={args.orientation}
            colors={node => node.data.color}
        />
    ),
}

export const CustomTooltip: Story = {
    render: args => (
        <IcicleHtml<RawDatum>
            {...commonProperties}
            orientation={args.orientation}
            tooltip={({ id, value, color }) => (
                <div
                    style={{
                        padding: 12,
                        color,
                        background: '#333333',
                    }}
                >
                    <span>Look, I'm custom :)</span>
                    <br />
                    <strong>
                        {id}: {value}
                    </strong>
                </div>
            )}
        />
    ),
}

export const CustomNode: Story = {
    parameters: {
        backgrounds: {
            default: 'Paper',
            values: [{ name: 'Paper', value: '#dadaca' }],
        },
    },
    args: {
        orientation: 'bottom',
    },
    render: args => <BonsaiIcicle orientation={args.orientation} />,
}

export const KeyboardNavigation: Story = {
    render: args => {
        const keyLogger = useKeyLoggerRef()

        return (
            <>
                <KeyLogger ref={keyLogger} only={SUPPORTED_KEYBOARD_KEYS} duration={2000} />
                <KeyboardNavigationContainer>
                    <IcicleHtml<RawDatum>
                        {...commonProperties}
                        width={600}
                        orientation={args.orientation}
                        isFocusable
                        onKeyDown={(_node, event) => {
                            keyLogger.current?.logKey(event)
                        }}
                    />
                    <KeyboardDoc />
                </KeyboardNavigationContainer>
            </>
        )
    },
    play: async ({ canvasElement }) => {
        await playKeyboardNavigationDemo(canvasElement)
    },
}
