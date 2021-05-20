import {
  ResponsiveTreeMap,
  ResponsiveTreeMapCanvas,
  ResponsiveTreeMapHtml,
} from '@nivo/treemap'
import { generateLibTree } from '@nivo/generators'
import { useChart } from '../hooks'
import { useMemo } from 'react'

const props = {
  identity: 'name',
  labelSkipSize: 16,
  value: 'loc',
  valueFormat: '.02s',
}

export function TreeMap() {
  const [key, flavor] = useChart()
  const [data] = useMemo(() => [generateLibTree(), key], [key])

  switch (flavor) {
    case 'canvas':
      return <ResponsiveTreeMapCanvas data={data} {...props} />
    case 'html':
      return <ResponsiveTreeMapHtml data={data} {...props} />
    case 'svg':
      return <ResponsiveTreeMap data={data} {...props} />
  }
}
