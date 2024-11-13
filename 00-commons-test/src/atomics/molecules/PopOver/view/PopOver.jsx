/**
 * Copyright (c) 2023 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2023
 *
 * @author: Julio Fuentes [18/09/2024]
 * @updated: ---
 * @description: ---
 * @version 1.0.0
**/

import React from 'react';
import PropTypes from 'prop-types';
import styles from './PopOver.module.scss';
import { useEffect } from 'react';
import GlobalEvent from '../../../../utils/GlobalEvent';
import { COMMONS_SUBSCRIBES } from '../../../../utils/constants';
import Utils from '../../../../utils/utils.js';


const PopOver = ({ label, children, className, triggerClassName, containerClassName, isShownPopOver, toggleShownPopOver }) => {

    useEffect(() => {

        init();
    },
        []
    );

    const init = () => {
        GlobalEvent.clearSubjects(COMMONS_SUBSCRIBES.toggleShownPopOver);
        GlobalEvent.get(COMMONS_SUBSCRIBES.toggleShownPopOver).subscribe((data) => {
            toggleShownPopOver(data);
        });
    }

    return (
        <div id={(Utils.getUUID())}>
            <div className={`${styles['pop-over']} ${className}`} id={(Utils.getUUID())}>
                <div className={`${styles['pop-over-trigger']} ${triggerClassName}`} onClick={() => {
                    toggleShownPopOver(true);
                }}>
                    {label}
                </div>
                {isShownPopOver ? <div className={`${styles['pop-over-container']} ${containerClassName}`}>
                    {children}
                </div> : null}
            </div>
            {isShownPopOver && <div className={`${styles['overlay-popover']}`} >

            </div>}
        </div>
    )
};

PopOver.propTypes = {
    /** Agrega un componente, ejemplo un botón*/
    label: PropTypes.node,
    /** Agrega el componente hijo al componente*/
    children: PropTypes.node,
    /** Agrega un estilo al componente*/
    className: PropTypes.string,
    /** Agrega un estilo al evento del componente*/
    triggerClassName: PropTypes.string,
    /** Agrega un estilo al componente hijo del componente*/
    containerClassName: PropTypes.string,
    /** Agrega un texto o etiqueta al componente*/
    isShownPopOver: PropTypes.bool,
    /** Habilita el evento onCLick del componente*/
    toggleShownPopOver: PropTypes.func
};

export default PopOver;