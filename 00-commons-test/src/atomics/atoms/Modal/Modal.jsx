/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Julio Fuentes [21/10/2024]
 * @updated: ---
 * @description: ---
 * @version 1.0.0
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Modal as ModalLiv } from '@lp_front_account/lp-kit-dashboards/';


const Modal = ({ isOpen, header, headerTextAling, title, width, closeOnCorner, content, actions, icon, handleClose }) => {

    return (
        <ModalLiv
            isOpen={isOpen}
            handleClose={handleClose}
            header={header}
            headerTextAling={headerTextAling}
            title={title}
            width={width}
            content={content}
            closeOnCorner={closeOnCorner}
            icon={icon}
            actions={actions}
        />
    );
}

Modal.propTypes = {
    /** Muestra o oculta el componente*/
    isOpen: PropTypes.bool,
    /** Agrega un texto como header al componente*/
    header: PropTypes.string,
    /** Alineación del texto como header del componente*/
    headerTextAling: PropTypes.string,
    /** Agrega un título al componente*/
    title: PropTypes.string,
    /** Agrega un Body al componente*/
    content: PropTypes.node,
    /**Establece un ancho al componente*/
    width: PropTypes.string,
    /**Cerrar el componente al dar clic fuera de él*/
    closeOnCorner: PropTypes.bool,
    /** Establece las acciones que tendrá el componente, ejemplo, un grupo de botones con eventos*/
    actions: PropTypes.node,
    /** Agrega un icono entre el Head y el title del componente*/
    icon: PropTypes.node,
    /** Habilita el evento de cerrado del componente*/
    handleClose: PropTypes.func
};

export default Modal;