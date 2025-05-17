import {PropsWithChildren} from "react";
import {AppHeader} from "@/app/_ui/app/AppHeader";
import {AppMiniNav} from "@/app/_ui/app/AppMiniNav";
import styles from './PageLayout.module.css';

export const PageLayout = ({ children}: PropsWithChildren) => {
    return (
        <>
            <AppHeader/>
            <AppMiniNav/>
            <div className={styles.content}>
                <div className={styles.content_inner}>
                    {children}
                </div>
            </div>
        </>
    )
}