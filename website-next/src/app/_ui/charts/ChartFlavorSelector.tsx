import Link from 'next/link'
import {ChartFlavor, Flavor} from "@/types/charts";
import styles from './ChartFlavorSelector.module.css'

const labelByFlavor: Record<Flavor, string> = {
    svg: 'svg',
    html: 'html',
    canvas: 'canvas',
    api: 'http api',
}

interface ChartFlavorSelectorProps {
    flavors: ChartFlavor[]
    current: Flavor
}

export const ChartFlavorSelector = ({
    flavors,
    current,
}: ChartFlavorSelectorProps) => {
    return (
        <div className={styles.container}>
            {flavors.map(flavor => (
                <Link
                    key={flavor.flavor}
                    href={flavor.path}
                    className={current === flavor.flavor ? styles.flavor__current : styles.flavor}
                >
                    {labelByFlavor[flavor.flavor]}
                </Link>
            ))}
        </div>
    )
}
