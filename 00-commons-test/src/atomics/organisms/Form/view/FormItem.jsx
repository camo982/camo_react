/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Diego Valencia [11/07/2024]
 * @updated: ---
 * @description: ---
 * @version 1.0.0
*/

import React from 'react'
import TextField from '../../../atoms/TextField/TextField.jsx';
import styles from './Form.module.scss'

const FormItem = ({ label, type, name, items, onChangeInput, ...props }) => {
    const formItem = new Map([
        ['text', ({ className, ...item }) => <TextField {...item} className={`${className} ${styles['w-100']}`} onChange={e => onChangeInput(e, item)} />],
        ['date', ({ className, ...item }) => <TextField {...item} className={`${className} ${styles['w-100']}`} onChange={e => onChangeInput(e, item)} />],
        ['time', ({ className, ...item }) => <TextField {...item} className={`${className} ${styles['w-100']}`} onChange={e => onChangeInput(e, item)} />],
        ['multiple', ({ className, ...item }) => <section className={styles['advanced-search-form']}>
            <p className={styles['advanced-search-form-item-label']}>{item.label}</p>
            <div className={`${className} ${styles['advanced-search-form-item-block']}`}>
                {item.items.map(({ className, ...item }, index) => <FormItem key={`advanced-search-form-item-block-item-${index}`} className={`${className} ${styles['advanced-search-form-item-block-item']}`} onChangeInput={onChangeInput}  {...item} />)}
            </div>
        </section>],
    ]);

    return (
        type ? formItem.get(type)({ label, type, name, items, ...props }) : formItem.get('text')({ label, type, name, items, ...props })
    )
}

FormItem.propTypes = {}

export default FormItem
