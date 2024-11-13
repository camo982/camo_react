/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Julio Fuentes [17/09/2024]
 * @updated: 
 * @description: ---
 * @version 1.0.0
*/

import React from 'react';
import PropTypes from 'prop-types';
import styles from './TimePicker.module.scss';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import Utils from '../../../utils/utils.js';

const TimePicker = ({ label, value, idInput, required, error, errorMessage, onChange, onOpen, onError, onClose }) => {

    const dateValue = (dayjs(value).isValid()) ? value : (dayjs());

    return (
        <div className={`${styles['timePickerModule']}`}>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}>
                <DemoContainer
                    components={['DatePicker']}>
                    <DatePicker
                        label={label ? label : ''}
                        name={idInput ? idInput : (Utils.getUUID())}
                        value={dateValue}
                        required={required ? required : false}
                        error={error ? error : false}
                        errorMessage={errorMessage}
                        onChange={onChange ? onChange : () => { }}
                        onOpen={onOpen ? onOpen : () => { }}
                        onError={onError ? onError : () => { }}
                        onClose={onClose ? onClose : () => { }}
                        slotProps={{ textField: { size: 'small' } }}
                        sx={{ marginLeft: '1rem', width: '11rem' }}
                        format={'DD/MM/YYYY'}
                        views={['year', 'month', 'day']}
                    />
                </DemoContainer>
            </LocalizationProvider>
        </div>
    );
};

TimePicker.propTypes = {
    /** Agrega una etiqueta o texto al componente*/
    label: PropTypes.string,
    /** valor por defecto del componente*/
    value: PropTypes.Date,
    /** ID del componente Input*/
    idInput: PropTypes.string,
    /** ¿Este campo o componente es requerido?*/
    required: PropTypes.bool,
    /** ¿Hay error?*/
    error: PropTypes.bool,
    /** Si hay error configura un mensaje*/
    errorMessage: PropTypes.string,
    /** Activa el evento onChange*/
    onChange: PropTypes.func,
    /** Activa el evento onOpen del componente*/
    onOpen: PropTypes.func,
    /** Activa el evento onError del componente*/
    onError: PropTypes.func,
    /** Activa el evento onClose del componente*/
    onClose: PropTypes.func,
};

export default TimePicker;
