import {
  ResponsiveTreeMap,
  ResponsiveTreeMapCanvas,
  ResponsiveTreeMapHtml,
} from '@nivo/treemap'
import { generateLibTree } from '@nivo/generators'
import { useChart } from '../hooks'

const props = {
  identity: 'name',
  labelSkipSize: 16,
  value: 'loc',
  valueFormat: '.02s',
}

export function TreeMap() {
  const [data, flavor] = useChart(generateLibTree)

  switch (flavor) {
    case 'canvas':
      return <ResponsiveTreeMapCanvas data={data} {...props} />
    case 'html':
      return <ResponsiveTreeMapHtml data={data} {...props} />
    case 'svg':
      return <ResponsiveTreeMap data={data} {...props} />
  }
}
