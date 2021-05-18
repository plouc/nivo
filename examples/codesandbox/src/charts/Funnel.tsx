import { ResponsiveFunnel } from '@nivo/funnel'
import { random } from '../utils'
import { useChart } from '../hooks'
import { useMemo } from 'react'

const modifier: ['darker', number] = ['darker', 3]
const props = {
  labelColor: { from: 'color', modifiers: [modifier] },
  motionConfig: 'wobbly',
  valueFormat: '>-.4s',
}

export function Funnel() {
  const [key] = useChart()
  const [data] = useMemo(
    () => [
      [
        {
          id: 'step_sent',
          value: random(90000, 100000),
          label: 'Sent',
        },
        {
          id: 'step_viewed',
          value: random(80000, 90000),
          label: 'Viewed',
        },
        {
          id: 'step_clicked',
          value: random(70000, 80000),
          label: 'Clicked',
        },
        {
          id: 'step_add_to_card',
          value: random(60000, 70000),
          label: 'Add To Card',
        },
        {
          id: 'step_purchased',
          value: random(50000, 60000),
          label: 'Purchased',
        },
      ],
      key,
    ],
    [key]
  )

  return <ResponsiveFunnel data={data} {...props} />
}
