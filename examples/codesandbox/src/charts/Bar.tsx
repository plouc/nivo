import { ResponsiveBar, ResponsiveBarCanvas } from '@nivo/bar'
import { generateCountriesData } from '@nivo/generators'
import { useChart } from '../hooks'

const keys = ['hot dogs', 'burgers', 'sandwich', 'kebab', 'fries', 'donut']
const props = {
  indexBy: 'country',
  keys,
  margin: { top: 60, right: 80, bottom: 60, left: 80 },
  padding: 0.2,
  labelTextColor: 'inherit:ligher(1.4)',
  labelSkipWidth: 16,
  labelSkipHeight: 16,
} as const

export function Bar() {
  const [data, flavor] = useChart(() =>
    generateCountriesData(keys, { size: 7 })
  )

  if (flavor === 'canvas') {
    return <ResponsiveBarCanvas data={data} {...props} />
  }

  return <ResponsiveBar data={data} {...props} />
}
