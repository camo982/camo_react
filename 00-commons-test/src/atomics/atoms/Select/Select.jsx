/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Julio Fuentes [01/11/2024]
 * @updated: ---
 * @description: ---
 * @version 1.0.0
*/

import PropTypes from 'prop-types';
import React from 'react';
import { TextField as TextFieldMui } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const Select = ({ id, label, value, required, helperText, list, disabled, compHeight, color, focused, error, onChange, onBlur }) => {
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

  return (
    <TextFieldMui
      select={true}
      disabled={disabled}
      size='small'
      id={id}
      label={label}
      required={required}
      error={error}
      helperText={helperText}
      value={value}
      onChange={onChange}
      sx={sx}
      SelectProps={{
        renderValue: selected => {
          return <div style={{ textAlign: 'left' }} key={selected}>{selected.label}</div>
        },
        IconComponent: KeyboardArrowDownIcon,
        MenuProps: { sx: { '&& .Mui-selected': { backgroundColor: 'white' } } }
      }}
    >
      {list.map(option => (
        <MenuItem
          key={option.value}
          value={option}
          sx={{ borderBottom: '1px solid #F5F5F5', minHeight: '40px', height: '40px' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <div>{option.label}</div>
            {option.value === value.value && <CheckIcon color='#333' />}
          </div>
        </MenuItem>
      ))}
    </TextFieldMui>
  );
}

Select.propTypes = {
  /** Input ID */
  id: PropTypes.string,
  /** String to define the label on the textfield */
  label: PropTypes.string.isRequired,
  /** Strings thas shows the value of the textfield */
  value: PropTypes.object.isRequired,
  /** If true the textfield is considered to be required in a form */
  required: PropTypes.bool,
  /** String that defines the helper text on the bottom of the input. */
  helperText: PropTypes.string,
  /** List of objects with the options to be displayed when select is true */
  list: PropTypes.array,
  /** Decision for disabled or not component */
  disabled: PropTypes.bool,
  /** String to define the component height (default= '2.5rem' (40px)) */
  compHeight: PropTypes.string,
  /** Change color for diferent case */
  color: PropTypes.oneOf(['primary', 'warning', 'error']).isRequired,
  /** Deciison focus input automatic */
  focused: PropTypes.bool,
  /**  If true one of the content validations detected an error */
  error: PropTypes.bool,
  /** A callback function to update the value being written on the textfield when input variant is selected (select=false) */
  onChange: PropTypes.func,
  /** A callback function to have control when an user touches a field */
  onBlur: PropTypes.func
}

export default Select;