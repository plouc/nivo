import {JSX} from "react";
import styles from './ChartLayout.module.css'

export const ChartLayout = ({ children }: { children: JSX.Element}) => {
    return (
        <div className={styles.layout}>
            {children}
        </div>
    )
}
