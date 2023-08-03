import { FC, PropsWithChildren } from 'react'
import styles from "./Card.module.css";
interface SimpleCardProps extends PropsWithChildren {
    className?: string
}
export const SimpleCard:FC<SimpleCardProps> = ({children = "", className=""}:SimpleCardProps) => {
    return <div className={styles.card + ' ' + className}>{children}</div>
}