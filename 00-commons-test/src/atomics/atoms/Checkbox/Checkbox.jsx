/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Julio Fuentes [13/09/2024]
 * @updated: ---
 * @description: ---
 * @version 1.0.0
*/

import PropTypes from 'prop-types';
import React from 'react';
import styles from './Checkbox.module.scss';
import { Checkbox as CheckboxMui } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Utils from '../../../utils/utils.js';

const Checkbox = ({ id, labelValue, checked, onChange }) => {

  return (
    <div className={styles['checkBox-module']}>
      <FormControlLabel
        sx={formControlLabelSx}
        control={
          <CheckboxMui
            sx={checked ? checkboxMuiSxChecked : checkboxMuiSx}
            id={id ? id : (Utils.getUUID())}
            checked={checked}
            onChange={onChange}
          />
        }
        label={labelValue ? labelValue : ''}
      />
    </div>
  )
}

Checkbox.propTypes = {
  /** Texto en el label del componente */
  labelValue: PropTypes.string,
  /** Id del componente */
  id: PropTypes.string,
  /** ¿Se inicia con check el componente? */
  checked: PropTypes.bool,
  /** Función para menejar el evento onChange del componente */
  onChange: PropTypes.func
}

export default Checkbox


const formControlLabelSx = {
  font: 'inherit',
  marginLeft: '0',
  marginRight: '0',
  fontSize: 'inherit',
  background: '#fff'
};

const checkboxMuiSx = {
  appearance: 'none',
  background: '#fff',
  font: 'inherit',
  color: 'currentColor',
  width: '30px',
  height: '30px',
  placeContent: 'center',
  '& .MuiSvgIcon-root': {
    appearance: 'none',
    background: '#fff',
    margin: '0',
    font: 'inherit',
    color: 'currentColor',
    width: '21px',
    height: '21px',
    fill: '#767676',
    borderRadius: '0.15em',
    transform: 'translateY(-0.075em)',
    display: 'grid',
    placeContent: 'center'
  }
};

const checkboxMuiSxChecked = {
  appearance: 'none',
  background: '#fff',
  font: 'inherit',
  color: 'currentColor',
  width: '30px',
  height: '30px',
  placeContent: 'center',
  '& .MuiSvgIcon-root': {
    appearance: 'none',
    background: '#fff',
    margin: '0',
    font: 'inherit',
    color: 'currentColor',
    width: '21px',
    height: '21px',
    fill: '#833177',
    borderRadius: '0.15em',
    transform: 'translateY(-0.075em)',
    display: 'grid',
    placeContent: 'center'
  }
};