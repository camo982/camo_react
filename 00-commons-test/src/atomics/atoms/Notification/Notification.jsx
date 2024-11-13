/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Julio Fuentes [17/09/2024]
 * @updated: ---
 * @description: ---
 * @version 1.0.0
*/

import React from 'react';
import PropTypes from 'prop-types';
import styles from './Notification.module.scss';

const Notification = ({ titleText, titleIcon, className, children, onClick }) => {
    return (
        <div className={`${className} ${styles.notification}`}>
            <div className={styles.leftBar}></div>
            <div className={styles.body}>
                <div className={styles.title}>
                    <div className={styles.details}>
                        <span className={`icon- ${styles.icon} ${titleIcon}`}></span>
                        <span className={styles.text}>
                            {titleText}
                        </span>
                    </div>
                    <span className={`icon- ${styles.info} icon-info`}>
                    </span>
                </div>
                <div className={styles.detail} onClick={onClick}>
                    {children}
                </div>
            </div>
        </div>
    )
};

Notification.propTypes = {
    /** Agrega un texto o etiqueta al componente*/
    titleText: PropTypes.string,
    /** Agrega un ícono al componente*/
    titleIcon: PropTypes.node,
    /** Agrega un estilo principal al componente*/
    className: PropTypes.string,
    /** Agrega un un componente hijo al componente*/
    children: PropTypes.node,
    /** habilita el evento onClick del componente*/
    onClick: PropTypes.func
};

export default Notification;
