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
import { Button } from '@lp_front_account/lp-kit-dashboards/';

const IconButton = ({ text, loading, disabled, size, variant, color, style, sx, icon, onClickButonNew }) => {

    return (
        <Button
            loading={loading ? loading : false}
            disabled={disabled ? disabled : false}
            onClick={onClickButonNew}
            text={text}
            size={size ? size : 'medium'}
            variant={variant ? variant : 'contained'}
            color={color ? color : 'primary'}
            style={style}
            sx={sx ? sx :
                {
                    minWidth: '172px',
                    maxWidth: '200px',
                    maxHeight: '40px',
                    minHeight: '40px',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: '18.2px',
                    '& .MuiButton-startIcon': {
                        marginRight: '4px'
                    }
                }
            }
            startIcon={icon}
        />
    )
}

IconButton.propTypes = {
    /** Texto del label del bontón */
    text: PropTypes.string,
    /** activa la apariencia de carga */
    loading: PropTypes.bool,
    /** activo o desactivado */
    disabled: PropTypes.bool,
    /** Tamaño del componente: small, medium, large */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /** variante del componente */
    variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
    /** Color del componente */
    color: PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
    /** Estilo personalizado del componente */
    sx: PropTypes.object,
    /** Estilo personalizado del componente */
    style: PropTypes.object,
    /** Icono del componente */
    icon: PropTypes.node,
    /** Activa el evento onCLick */
    onClickButonNew: PropTypes.func
}

export default IconButton;