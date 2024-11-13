/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Diego Valencia [11/07/2024]
 * @updated: ---
 * @description: ---
 * @version 1.0.0
*/

import React from 'react';

const Hide = ({ className = '', children, grant }) => {
    return <div className={className} data-grant="true" id={`${grant}`} style={{
        display: 'none'
    }}>
        {children}
    </div>
}

export default Hide;
