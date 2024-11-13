/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Julio Fuentes [17/09/2024]
 * @updated: ---
 * @description: ---
 * @version 1.0.0
*/

import React from 'react';
import PropTypes from 'prop-types';
import LabelsManager from '../../../utils/LabelsManager';
import intl from 'react-intl-universal';
import { IconButton, Box, TextField, MenuItem } from '@mui/material';
import FirstPageOutlinedIcon from '@mui/icons-material/FirstPageOutlined';
import LastPageOutlinedIcon from '@mui/icons-material/LastPageOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const rowsXpage = [
    { value: '10', label: '10' },
    { value: '20', label: '20' },
    { value: '30', label: '30' }
];

const Paginator = ({ rowsPerPage, dataLength, currentPage, boxStyle, label1Style, label2Style, txtComponents, handlePagination, handleRowsXpage }) => {

    const paginationNumber = Math.ceil(dataLength / (rowsPerPage.value));

    const first = () => {
        if (currentPage === 1) {
            return currentPage;
        }
        if (currentPage > 1) {
            return (((currentPage - 1) * rowsPerPage.value) + 1);
        }
    }

    const second = () => {
        if (paginationNumber != currentPage) {
            return (currentPage * rowsPerPage.value);
        }
        if (paginationNumber === currentPage) {
            return (dataLength);
        }
    }

    return (
        <Box
            style={boxStyle}
            sx={{ flexShrink: 0, ml: 2.5 }}>
            <label
                style={label1Style}
            >
                {LabelsManager.getLabelTraductor(
                    intl,
                    (txtComponents[0]['PAGINATOR_1'].idTxt),
                    (txtComponents[0]['PAGINATOR_1'].txtIfNull)
                )}
            </label>
            <TextField
                select
                label=''
                value={rowsPerPage}
                onChange={handleRowsXpage}
                sx={{
                    ' & .MuiOutlinedInput-notchedOutline': {
                        border: 'none'
                    },
                    ' & .MuiInputBase-input': {
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        lineHeight: 'normal',
                        color: '333',
                        padding: '11px 8px'
                    },
                    '& .MuiSelect-icon': {
                        fontSize: '16px',
                        fontFamily: 'Roboto',
                        right: '12px',
                        top: 'calc(45% - .5em)'
                    }
                }}
                size='small'
                SelectProps={
                    {
                        renderValue: selected => {
                            return <div key={selected}>{selected.label}</div>
                        },
                        IconComponent: KeyboardArrowDownIcon,
                        MenuProps: {
                            sx: {
                                '&& .Mui-selected': {
                                    backgroundColor: 'white'
                                }
                            }
                        }
                    }
                }
            >
                {rowsXpage.map((option) => (
                    <MenuItem
                        key={option.value}
                        value={option}
                        sx={{
                            borderStyle: 'none', borderBottom: '0px solid #fff', minHeight: '14px', height: '14px',
                            fontFamily: 'Roboto', fontStyle: 'normal', ontWeight: '400', lineHeight: 'normal', color: '333'
                        }}>
                        <div style={{
                            width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: '12px',
                            fontFamily: 'Roboto', fontStyle: 'normal', ontWeight: '400', lineHeight: 'normal', color: '333'
                        }}>
                            <div>{option.label}</div>
                        </div>
                    </MenuItem>
                ))}
            </TextField>
            <label
                style={label2Style}
            >
                {' ' + (first()) + ' '}
                -
                {' ' + (second()) + ' '}
                {LabelsManager.getLabelTraductor(
                    intl,
                    (txtComponents[0]['PAGINATOR_2'].idTxt),
                    (txtComponents[0]['PAGINATOR_2'].txtIfNull)
                )}
                {' ' + (dataLength) + ' '}
            </label>
            <IconButton
                size='small'
                onClick={() => handlePagination(1)}
                disabled={currentPage === 1}
                style={{ paddingRight: '16px' }}
                aria-label="first page">
                {<FirstPageOutlinedIcon />}
            </IconButton>
            <IconButton
                size='small'
                onClick={() => handlePagination(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ paddingRight: '16px' }}
                aria-label="previous page">
                {<NavigateBeforeOutlinedIcon />}
            </IconButton>
            <IconButton
                size='small'
                onClick={() => handlePagination(currentPage + 1)}
                disabled={paginationNumber === currentPage}
                style={{ paddingRight: '16px' }}
                aria-label="next page">
                {<NavigateNextOutlinedIcon />}
            </IconButton>
            <IconButton
                size='small'
                onClick={() => handlePagination(paginationNumber)}
                disabled={paginationNumber === currentPage}
                style={{ paddingRight: '16px' }}
                aria-label="last page">
                {<LastPageOutlinedIcon />}
            </IconButton>
        </Box>
    )
}

Paginator.propTypes = {
    /** ¿Cuantas filas mostraré por página*/
    rowsPerPage: PropTypes.object,
    /** ¿Cuántas filas en total hay?*/
    dataLength: PropTypes.number,
    /** Página actual*/
    currentPage: PropTypes.number,
    /**Estilo de la caja o contenedor principal */
    boxStyle: PropTypes.object,
    /**textos para los componentes */
    txtComponents: PropTypes.array,
    /**Estilo de la la etiqueta uno */
    label1Style: PropTypes.object,
    /**Estilo de la la etiqueta dos */
    label2Style: PropTypes.object,
    /** Maneja la paginación*/
    handlePagination: PropTypes.func.isRequired,
    /** Maneja la las filas por página*/
    handleRowsXpage: PropTypes.func.isRequired
};

export default Paginator;