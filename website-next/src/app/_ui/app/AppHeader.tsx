import { AppHeaderNav } from './AppHeaderNav'
import styles from './AppHeader.module.css'

export const AppHeader = () => {
    return (
        <header className={styles.header}>
            <AppHeaderNav/>
        </header>
    )
}