/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Julio Fuentes [30-10-2024]
 * @updated: ---
 * @description: Encapsulates Material-UI components using atomic design principles
 * @version 1.0.0
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip as MuiTooltip, tooltipClasses } from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import EditIcon from '@mui/icons-material/Edit';
import styles from './Tooltip.module.scss';
import { styled } from '@mui/material/styles';

const isEmptyObject = (obj) => {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

const Tooltip = ({ title, children }) => {
    const { creation, modification } = title || {};

    return (
        <LightTooltip
            title={
                <div className={styles['toolTip']}>
                    {creation.name && !isEmptyObject(creation) && (
                        <>
                            <div className={styles['contentStrong']}>
                                <PersonAddOutlinedIcon fontSize='small' />
                                {creation?.name ? ' ' : ''} Creación: {creation?.name} <br />
                                <div className={styles['contentDate']}>
                                    {creation?.date} {creation?.date ? ' - ' : ''} {creation?.time}
                                </div>
                            </div>
                        </>
                    )}
                    {modification.name && !isEmptyObject(modification) && (
                        <>
                            <div className={styles['contentStrong']}>
                                <EditIcon fontSize='small' />
                                {modification?.name ? ' ' : ''} Modificación: {modification?.name} <br />
                                <div className={styles['contentDate']}>
                                    {modification?.date} {modification?.date ? ' - ' : ''} {modification?.time}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            }
        >
            {children}
        </LightTooltip>
    );
};

Tooltip.propTypes = {
    title: PropTypes.shape({
        creation: PropTypes.shape({
            name: PropTypes.string,
            date: PropTypes.string,
            time: PropTypes.string,
        }),
        modification: PropTypes.shape({
            name: PropTypes.string,
            date: PropTypes.string,
            time: PropTypes.string,
        }),
    }),
    children: PropTypes.element.isRequired,
};


const LightTooltip = styled(({ className, ...props }) => (
    <MuiTooltip placement="bottom-start" {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        '&:before': {
            border: '1px solid rgba(21, 21, 21, 0.12)'
        },
        color: theme.palette.common.white
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        borderRadius: '4px',
        boxShadow: '0px 6px 12px 0px rgba(21, 21, 21, 0.12)'
    }
}));

export default Tooltip;