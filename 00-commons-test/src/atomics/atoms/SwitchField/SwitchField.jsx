/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Julio Fuentes [17/09/2024]
 * @updated: --
 * @description: ---
 * @version 1.0.0
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, FormControlLabel } from '@mui/material';
import styles from './SwitchField.module.scss';
import Utils from '../../../utils/utils.js';


const SwitchField = ({ label, checked, idInput, onChange }) => {

  return (
    <div className={`${styles.switchfield}`}>
      <FormControlLabel
        sx={formControlLabelSx}
        control={
          <Switch
            checked={checked ? checked : false}
            id={idInput ? idInput : (Utils.getUUID())}
            onChange={onChange ? onChange : () => { }}
            sx={switchStyle}
          />}
        label={label ? label : ''} />
    </div>
  );
};

SwitchField.propTypes = {
  /** Agrega un texto o etiqueta al componente*/
  label: PropTypes.string.isRequired,
  /** ¿IsChecked por defecto?*/
  checked: PropTypes.bool,
  /** ID del componente*/
  idInput: PropTypes.string,
  /** Habilita el evento onChange*/
  onChange: PropTypes.func,
};

export default SwitchField;


const switchStyle = {
  borderRadius: 2,
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#833177"
  },
  "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
    backgroundColor: '#833177'
  },
  "&:hover .MuiSwitch-switchBase": {
    color: '#833177'
  },
}

const formControlLabelSx = {
  font: 'inherit',
  marginLeft: '0',
  marginRight: '0',
  fontSize: 'inherit',
  background: '#fff'
};