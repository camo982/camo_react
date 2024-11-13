/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Julio Fuentes [13/09/2024]
 * @updated: ---
 * @description: ---
 * @version 1.0.0
*/

import React from 'react';
import PropTypes from 'prop-types';
import Utils from '../../../utils/utils.js';

const Box = ({ id, extraClass, children }) => {

    return (
        <section style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '16px',
            backgroundColor: '#FFF',
            borderRadius: '4px',
            boxShadow: '0px 0px 15px 0px rgba(21, 21, 21, 0.12)'
        }}
            id={id ? id : (Utils.getUUID())}
            className={extraClass ? `${extraClass}` : ('')}
        >
            {children}
        </section>
    )
}

Box.propTypes = {
    /** Ideentificador del componente */
    id: PropTypes.string,
    /** Asignar estilo extra */
    extraClass: PropTypes.string,
    /** Asignar componente hijo */
    children: PropTypes.node
}

export default Box;
