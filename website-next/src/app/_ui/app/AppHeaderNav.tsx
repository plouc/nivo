import Link from 'next/link'
import styles from './AppHeaderNav.module.css'

export const AppHeaderNav = () => {
    return (
        <header className={styles.nav}>
            <span className={styles.item}>
                Why nivo?
                {/* <FiChevronDown /> */}
                <span className={styles.dropdown}>
                    <Link href="/about/" className={styles.subitem}>About</Link>
                    <Link href="/references/" className={styles.subitem}>References</Link>
                </span>
            </span>
            <Link href="/components/" className={styles.item}>
                Components
            </Link>
            {/*
            <HeaderItem>
                Guides <FiChevronDown />
                <HeaderSub>
                    {nav.guides.map(guide => (
                        <HeaderSubItem key={guide.path} to={guide.path}>
                            {guide.label}
                        </HeaderSubItem>
                    ))}
                </HeaderSub>
            </HeaderItem>
            */}
            <span className={styles.item}>
                Guides
                <span className={styles.dropdown}>
                    <Link href="/guides/axes/" className={styles.subitem}>Axes</Link>
                    <Link href="/guides/colors/" className={styles.subitem}>Colors</Link>
                    <Link href="/guides/legends/" className={styles.subitem}>Legends</Link>
                    <Link href="/guides/gradients/" className={styles.subitem}>Gradients</Link>
                    <Link href="/guides/patterns/" className={styles.subitem}>Patterns</Link>
                    <Link href="/guides/theming/" className={styles.subitem}>Theming</Link>
                </span>
            </span>
            <a href="https://nivo.rocks/storybook/"
                target="_blank"
                rel="noopener noreferrer"
               className={styles.item}
            >
                storybook
                {/* <FiExternalLink /> */}
            </a>
            <a
                href="https://opencollective.com/nivo"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.item}
            >
                Donate
                {/* <FiExternalLink /> */}
            </a>
            {/*
            <ThemeSelector />
            <IconExternalLink
                href="https://github.com/plouc/nivo"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
            >
                <FaGithub />
            </IconExternalLink>
            <NavToggleButton isOpen={isNavOpen} onClick={toggleNav} />
            */}
        </header>
    )
}