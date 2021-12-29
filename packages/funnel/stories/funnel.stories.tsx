import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { ResponsiveFunnel } from '../src'

const commonProps = {
    data: [
        {
            id: 'step_sent',
            value: 85523,
            label: 'Sent',
        },
        {
            id: 'step_viewed',
            value: 74844,
            label: 'Viewed',
        },
        {
            id: 'step_clicked',
            value: 62617,
            label: 'Clicked',
        },
        {
            id: 'step_add_to_card',
            value: 50425,
            label: 'Add To Card',
        },
        {
            id: 'step_purchased',
            value: 31139,
            label: 'Purchased',
        },
    ],
    margin: { top: 20, right: 20, bottom: 20, left: 20 },
    borderWidth: 20,
    motionConfig: 'wobbly',
}

const stories = storiesOf('Funnel', module)

stories.addDecorator(withKnobs)

stories.add('custom tooltip', () => (
    <div style={{ width: 900, height: 300 }}>
        <ResponsiveFunnel
            {...commonProps}
            direction={'horizontal'}
            tooltip={({ part }) => (
                <div
                    style={{
                        padding: 12,
                        color: '#fff',
                        background: '#222222',
                    }}
                >
                    <span>Look, I'm custom :)</span>
                    <br />
                    <strong>
                        {part.data.id}: {part.formattedValue}
                    </strong>
                </div>
            )}
        />
    </div>
))
