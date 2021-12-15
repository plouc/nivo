import { ChartProps, ChartType } from '../mapping'

export interface StorageEntry<T extends ChartType> {
    type: T
    props: ChartProps<T>
    url: string
}

const store: Record<string, StorageEntry<ChartType>> = {}

export const set = (key: string, value: StorageEntry<ChartType>) => {
    store[key] = value
}

export const get = (key: string): StorageEntry<ChartType> | undefined => {
    return store[key]
}

export const dump = () => store
