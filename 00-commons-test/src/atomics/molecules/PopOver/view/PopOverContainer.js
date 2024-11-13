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

import PropTypes from 'prop-types';
import View from './PopOver.jsx';
import React from 'react';


const PopOverContainer = props => {

    const toggleShownPopOver = (close) => {
        props.setShownPopOver(close);
    }

    return (
        <View
            isShownPopOver={props.isShownPopOver}
            toggleShownPopOver={toggleShownPopOver}
            {...props}
        />
    )
};

PopOverContainer.propTypes = {
    /** Agrega un componente extra, ejemplo un botón*/
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
    setShownPopOver: PropTypes.func
};

PopOverContainer.defaultProps = {
    className: '',
    triggerClassName: '',
    containerClassName: '',
    isShownPopOver: true
};

export default PopOverContainer;