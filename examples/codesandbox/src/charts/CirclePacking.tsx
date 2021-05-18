import {
  ResponsiveCirclePacking,
  ResponsiveCirclePackingCanvas,
  ResponsiveCirclePackingHtml,
} from '@nivo/circle-packing'
import { generateLibTree } from '@nivo/generators'
import { useChart } from '../hooks'
import { useMemo } from 'react'

const props = {
  id: 'name',
  labelsSkipRadius: 16,
  padding: 2,
  value: 'loc',
}

export function CirclePacking() {
  const [key, flavor] = useChart()
  const [data] = useMemo(() => [generateLibTree(), key], [key])

  switch (flavor) {
    case 'canvas':
      return <ResponsiveCirclePackingCanvas data={data} {...props} />
    case 'html':
      return <ResponsiveCirclePackingHtml data={data} {...props} />
    case 'svg':
      return <ResponsiveCirclePacking data={data} {...props} />
  }
}
