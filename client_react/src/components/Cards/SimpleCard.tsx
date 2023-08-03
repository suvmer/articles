import { FC } from 'react'
import styles from "./Card.module.css";
import { SimpleCardProps } from '../../types/UI';

export const SimpleCard:FC<SimpleCardProps> = ({children = "", className=""}:SimpleCardProps) => {
    return <div className={styles.card + ' ' + className}>{children}</div>
}