import styled from 'styled-components'
import { FaCircleExclamation } from 'react-icons/fa6'
import { KeyboardDoc as BaseKeyboardDoc } from '../internal/KeyLogger'
import { userEvent, within } from '@storybook/test'
import { sleep } from '../internal/helpers'

export const SUPPORTED_KEYBOARD_KEYS = [
    'Tab',
    'ArrowUp',
    'ArrowDown',
    'ArrowRight',
    'ArrowLeft',
    'Enter',
    ' ',
    'Escape',
]

export const KeyboardNavigationContainer = styled.div`
    display: flex;

    & > *:first-child {
        margin-right: 24px;
    }
`

const KeyboardNavigationInfo = styled.div`
    svg {
        font-size: 16px;
        color: #dfb137;
        vertical-align: text-bottom;
    }
`

export const KeyboardDoc = () => (
    <BaseKeyboardDoc
        keys={[
            {
                key: 'Tab',
                description: 'Move to the next node, as they appear in the DOM.',
            },
            {
                key: 'ArrowUp',
                description: 'Move to the parent of the current node.',
            },
            {
                key: 'ArrowDown',
                description: 'Move to the first child of the current node.',
            },
            {
                key: 'ArrowRight',
                description: 'Move to the next node at the same depth as the current one.',
            },
            {
                key: 'ArrowLeft',
                description: 'Move to the previous node at the same depth as the current one.',
            },
            { key: 'Enter', description: 'Zoom into the current node.' },
            { key: ' ', description: 'Zoom into/out of the current node.' },
            { key: 'Escape', description: 'Zoom out of the current node.' },
        ]}
    >
        <KeyboardNavigationInfo>
            <FaCircleExclamation /> The arrow keys mapping is adjusted depending on the orientation
            of the chart.
        </KeyboardNavigationInfo>
    </BaseKeyboardDoc>
)

export const playKeyboardNavigationDemo = async (canvasElement: HTMLElement) => {
    const canvas = within(canvasElement)
    const delay = 600

    const root = canvas.getByTestId('icicle.rect.nivo')

    root.focus()
    await sleep(delay)
    await userEvent.keyboard('{arrowdown}') // -> nivo.viz
    await sleep(delay)
    await userEvent.keyboard('{tab}') // -> nivo.colors
    await sleep(delay)
    await userEvent.keyboard('{arrowright}') // -> nivo.utils
    await sleep(delay)
    await userEvent.keyboard(' ') // zoom nivo.utils
    await sleep(delay)
    await userEvent.keyboard('{arrowdown}') // -> nivo.utils.randomize
    await sleep(delay)
    await userEvent.keyboard('{arrowright}') // -> nivo.viz.resetClock
    await sleep(delay)
    await userEvent.keyboard('{arrowright}') // -> nivo.viz.noop
    await sleep(delay)
    await userEvent.keyboard('{arrowright}') // -> nivo.viz.tick
    await sleep(delay)
    await userEvent.keyboard('{arrowup}') // -> nivo.viz
    await sleep(delay)
    await userEvent.keyboard('{arrowright}') // -> nivo.generators
    await sleep(delay)
    await userEvent.keyboard('{arrowright}') // -> nivo.set
    await sleep(delay)
    await userEvent.keyboard('{arrowright}') // -> nivo.text
    await sleep(delay)
    await userEvent.keyboard('{arrowright}') // -> nivo.misc
    await sleep(delay)
    await userEvent.keyboard(' ') // dezoom nivo.misc
    await sleep(delay)
    await userEvent.keyboard('{arrowdown}') // -> nivo.misc.greetings
    await sleep(delay)
    await userEvent.keyboard('{arrowright}') // -> nivo.misc.other
    await sleep(delay)
    await userEvent.keyboard('{arrowright}') // -> nivo.misc.path
    await sleep(delay)
    await userEvent.keyboard('{arrowdown}') // -> nivo.misc.path.pathA
    await sleep(delay)
    await userEvent.keyboard('{arrowright}') // -> nivo.misc.path.pathB
    await sleep(delay)
    await userEvent.keyboard('{enter}') // zoom nivo.misc.path.pathB
    await sleep(delay)
    await userEvent.keyboard('{escape}') // dezoom nivo.misc.path.pathB
    await sleep(delay)
}
