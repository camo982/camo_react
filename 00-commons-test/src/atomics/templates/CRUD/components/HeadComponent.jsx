/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Julio Fuentes [15/10/2024]
 * @updated: ---
 * @description: ---
 * @version 1.0.0
*/

import PropTypes from 'prop-types';
import React from 'react';
import intl from 'react-intl-universal';
import styles from '../CRUD.module.scss';
import { SearchBar } from '../../../organisms/SearchBar/index.js';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LabelsManager from '../../../../utils/LabelsManager.js'
import { IconButton } from '../../../atoms/IconButton/index.js';

//
const HeadComponent = props => {
    const {
        title,
        idTextField,
        txtComponents,
        onChangeText,
        onClickButonNew
    } = props

    return (
        <section className={styles.searchContainer}>
            <div className={styles.title}>
                <p>{title}</p>
            </div>
            <div className={styles.searchBar}>
                <SearchBar
                    idTextField={idTextField}
                    txtComponents={txtComponents}
                    onChangeText={onChangeText}
                />
            </div>
            <div className={styles.button}>
                <IconButton
                    loading={false}
                    disabled={false}
                    onClickButonNew={onClickButonNew}
                    text={LabelsManager.getLabelTraductor(
                        intl,
                        (txtComponents[0]['BUTTON_1'].idTxt),
                        (txtComponents[0]['BUTTON_1'].txtIfNull)
                    )}
                    size='medium'
                    variant='contained'
                    color='primary'
                    sx={{
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
                    }}
                    startIcon={<PersonAddIcon />}
                />
            </div>
        </section>
    );
};

HeadComponent.propTypes = {
    /**Título del componente */
    title: PropTypes.string,
    /** Id del textfield*/
    idTextField: PropTypes.string,
    /**textos para los componentes */
    txtComponents: PropTypes.array,
    /** Habilita  el evento onChangeText del componente TextField*/
    onChangeText: PropTypes.func,
    /** Habilita  el evento onclick del componente Button*/
    onClickButonNew: PropTypes.func
};

export default HeadComponent;