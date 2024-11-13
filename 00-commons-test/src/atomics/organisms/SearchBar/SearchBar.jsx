/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Julio Fuentes [15/10/2024]
 * @updated: ---
 * @description: Creación del Template CRUD
 * @version 1.0.0
*/

import React from 'react';
import PropTypes from 'prop-types';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Box, TextField, InputAdornment } from '@mui/material';
import LabelsManager from '../../../utils/LabelsManager';
import intl from 'react-intl-universal';
import Utils from '../../../utils/utils.js';

function SearchBar({ idTextField, size, txtComponents, onChangeText }) {
    return (
        <Box sx={{
        }}>
            <TextField
                id={idTextField ? idTextField : (Utils.getUUID())}
                onChange={onChangeText}
                size={size ? size : 'small'}
                sx={{
                    background: '#ffffff',
                    width: '100%',
                    '& .MuiFormHelperText-root': {
                        color: '#767676',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                        fontStyle: 'normal',
                        fontWeight: '300',
                        lineHeight: '15.6px',
                        marginLeft: '2px'
                    },
                    '& .MuiInputBase-input': {
                        color: '#767676',
                        fontSize: '16px',
                        fontFamily: 'Roboto',
                        fontStyle: 'normal',
                        fontWeight: '300',
                        lineHeight: '20.8px',
                    }
                }}
                placeholder={
                    LabelsManager.getLabelTraductor(
                        intl,
                        (txtComponents[0]['SEARCHBAR_1'].idTxt),
                        (txtComponents[0]['SEARCHBAR_1'].txtIfNull)
                    )
                }
                helperText={
                    LabelsManager.getLabelTraductor(
                        intl,
                        (txtComponents[0]['SEARCHBAR_2'].idTxt),
                        (txtComponents[0]['SEARCHBAR_2'].txtIfNull)
                    )
                }
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlinedIcon />
                            </InputAdornment>
                        )
                    },
                }}
            />
        </Box>
    );
};

SearchBar.propTypes = {
    /** Id del textfield*/
    idTextField: PropTypes.string,
    /** number to modify width the component's */
    Selectwidth: PropTypes.number,
    /**textos para los componentes */
    txtComponents: PropTypes.array,
    /** Habilita  el evento onChangeText del componente TextField*/
    onChangeText: PropTypes.func
};

export default SearchBar;