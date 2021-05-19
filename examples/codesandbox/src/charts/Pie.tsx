import { ResponsivePie, ResponsivePieCanvas } from '@nivo/pie'
import { generateProgrammingLanguageStats } from '@nivo/generators'
import { useChart } from '../hooks'
import { useMemo } from 'react'

const props = {
  cornerRadius: 5,
  innerRadius: 0.6,
  margin: { top: 80, right: 120, bottom: 80, left: 120 },
  padAngle: 0.5,
}

export function Pie() {
  const [key, flavor] = useChart()
  const [data] = useMemo(
    () => [
      generateProgrammingLanguageStats(true, 9).map(({ label, ...data }) => ({
        id: label,
        ...data,
      })),
      key,
    ],
    [key]
  )

  if (flavor === 'canvas') {
    return <ResponsivePieCanvas data={data} {...props} />
  }

  return <ResponsivePie data={data} {...props} />
}
