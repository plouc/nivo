import { AppHeaderNav } from './AppHeaderNav'
import styles from './AppHeader.module.css'

export const AppHeader = () => {
    return (
        <header className={styles.header}>
            <h1>App Header</h1>
            <AppHeaderNav/>
        </header>
    )
}