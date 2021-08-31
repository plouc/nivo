import { groupProperties } from '../../../lib/componentProperties'
import { props as geoProps } from '../geo/props'

const props = [...geoProps]

export const groups = groupProperties(props)
