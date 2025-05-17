import styles from './ChartHeader.module.css'

interface ChartHeaderProps {
    component: string
    tags?: string[]
}

export const ChartHeader = ({
    component,
    tags = []
}: ChartHeaderProps) => {
    return (
        <div className={styles.header}>
            <h1 className={styles.title}>{component}</h1>
            <div>
                {tags.map(tag => (
                    <span key={tag} className={styles.tag}>
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    )
}
