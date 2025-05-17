import fromPairs from 'lodash/fromPairs.js'
import differenceWith from 'lodash/differenceWith.js'
import toPairs from 'lodash/toPairs.js'
import isEqual from 'lodash/isEqual.js'

export const objectDiff = (a: Record<string, unknown>, b: Record<string, unknown>) =>
    fromPairs(differenceWith(toPairs(a), toPairs(b), isEqual))
