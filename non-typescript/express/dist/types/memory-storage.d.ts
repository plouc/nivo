import { ChartProps, ChartType } from '@nivo/static';
export interface StorageEntry<T extends ChartType> {
    type: T;
    props: ChartProps<T>;
    url: string;
}
export declare const set: (key: string, value: StorageEntry<ChartType>) => void;
export declare const get: (key: string) => StorageEntry<ChartType> | undefined;
export declare const dump: () => Record<string, StorageEntry<"bar" | "circle_packing" | "calendar" | "chord" | "heatmap" | "line" | "pie" | "radar" | "sankey" | "sunburst" | "treemap">>;
//# sourceMappingURL=memory-storage.d.ts.map