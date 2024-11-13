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
import PropTypes from 'prop-types'
import Button from '../../../atoms/Button/Button.jsx'
import styles from './Form.module.scss'
import FormItem from './FormItem.jsx';

const Form = ({ formConfig, onChangeInput, formValues, extraClass, ...props }) => {
    return (
        <div className={`${styles['form']} ${extraClass}`}>
            <p className={styles['text-1']}>Complete el formulario con los datos del centro</p>
            <p className={styles['text-2']}> <span className={styles['text-red']}>*</span> Campos obligatorios</p>
            <form action="" className={styles.form}>
                {formConfig.items.map((item, index) => <div key={`form-item-${index}`} className={styles['form-item']}>
                    {<FormItem {...item} value={formValues?.[item?.name] ? formValues[item.name] : ''} onChangeInput={onChangeInput} />}
                </div>)}
            </form>
            <div className={styles['form-actions']}>
                <Button type={'outline'} className={styles['secondary-action']} onClick={() => {
                    if (cancelHandler) {
                        cancelHandler();
                    }
                }} >Cancelar</Button>
                <Button type={'main'} className={styles['main-action']} onClick={formValues ? e => updateHandler(values) : e => createHandler(values)} disabled={false}>Guardar</Button>
            </div>

        </div>
    )
}


Form.propTypes = {
    formConfig: PropTypes.object
}

Form.defaultProps = {
    formConfig: { title: '', items: [] }
}

export default Form
