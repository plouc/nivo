import Link from 'next/link'
import styles from './AppMiniNav.module.css';

export const AppMiniNav = () => {
    return (
        <aside className={styles.container}>
            <Link href="/" className={styles.logo}>
            </Link>
            <div className={styles.nav}>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>
        </aside>
    )
}