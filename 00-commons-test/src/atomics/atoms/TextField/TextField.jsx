/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Julio Fuentes [24/10/2024]
 * @updated: ---
 * @description: ---
 * @version 1.0.0
*/

import React from 'react';
import PropTypes from 'prop-types';
import { TextField as TextFieldMui } from '@mui/material';

const TextField = ({ id, label, required, error, helperText, type, value, disabled, multiline, onChange }) => {

  let sx = {
    background: '#ffffff',
    width: '100%',
    '& .MuiFormHelperText-root': {
      letterSpacing: 0,
      color: '#767676',
      fontSize: '12px',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '300',
      lineHeight: '15.6px',
      marginLeft: '2px',
      marginRight: '2px',
      textAlign: 'right',
      padding: '0'
    },
    '& .MuiInputBase-input': {
      color: '#333',
      fontSize: '16px',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '300',
      lineHeight: '20.8px'
    },
    '& .MuiFormLabel-asterisk': {
      color: 'red'
    }
  };

  if (error) {
    sx = {
      ...sx,
      '& .Mui-error': {
        color: 'red',
        marginLeft: '2px',
        textAlign: 'left'
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: 'red'
        }
      }
    };
  } else {
    sx = {
      ...sx,
      '& .MuiFormLabel-root': {
        color: '#767676',
        '&.Mui-focused': {
          color: '#767676'
        }
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: '#C0C0C0'
        }
      }
    };
  }

  if (disabled)
    sx = {
      ...sx,
      '& .MuiOutlinedInput-root': {
        '& fieldset.MuiOutlinedInput-notchedOutline': {
          border: '1px solid #D8D8D8'
        }
      }
    }

  let multilinea;

  if (multiline) {
    multilinea = {
      rows: 4
    }
  }

  return (
    <TextFieldMui
      disabled={disabled}
      size='small'
      id={id}
      label={label}
      required={required}
      error={error}
      helperText={helperText}
      type={type}
      value={value}
      onChange={onChange}
      sx={sx}
      multiline={multiline ? multiline : false}
      {...multilinea}
    />
  );
}

TextField.propTypes = {
  /** Id del componente*/
  id: PropTypes.string,
  /** Label del componente*/
  label: PropTypes.string,
  /** El campo es requerido?*/
  required: PropTypes.bool,
  /** Estilo de error del campo*/
  error: PropTypes.bool,
  /**Helper text del componente */
  helperText: PropTypes.string,
  /**Tipo de datos del campo */
  type: PropTypes.string,
  /**Valor o texto del compoenente */
  value: PropTypes.string,
  /**Componente deshabilitado? */
  disabled: PropTypes.bool,
  /** habilitar multilinea */
  multiline: PropTypes.bool,
  /**activa el evento onChange del componente */
  onChange: PropTypes.func,
};

export default TextField;