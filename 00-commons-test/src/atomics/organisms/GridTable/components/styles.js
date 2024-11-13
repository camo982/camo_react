/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Julio Fuentes [18/10/2024]
 * @updated: ---
 * @description: Estilos para los componentes MUI del grid
 * @version 1.0.0
*/

export const sxTableContainer = {
    minWidth: '650px',
    maxWidth: '100%',
    alignItems: 'center'
};

export const sxTable = {
    minWidth: '650px',
    maxWidth: '100%',
    alignItems: 'center'
};

export const sxTableHead = {
    alignItems: 'center'
};

export const sxTableRowHead = {
    height: '56px',
    alignItems: 'center'
};

export const sxTableCellHead = (type) => {
    if (type === 'text') {
        return {
            minWidth: '40px',
            maxWidth: '300px',
            height: '56px',
            padding: '15px 16px 15px 16px',
            textAlign: 'left',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: '18.2px',
            borderBottom: '2px solid #D8D8D8',
            background: '#FFF',
            color: '#333',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
        }
    }
    if (type === 'icon') {
        return {
            minWidth: '40px',
            maxWidth: '300px',
            height: '56px',
            padding: '15px 16px 15px 16px',
            textAlign: 'center',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: '18.2px',
            borderBottom: '2px solid #D8D8D8',
            background: '#FFF',
            color: '#333',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
        }
    }
};

export const sxTableBody = {
    alignItems: 'center'
};

export const sxTableRowHBody = {
    height: '56px',
    alignItems: 'center'
};

export const sxTableCellBody = (type) => {
    if (type === 'text') {
        return {
            minWidth: '40px',
            maxWidth: '300px',
            height: '56px',
            padding: '15px 16px 15px 16px',
            textAlign: 'left',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '18.2px',
            borderBottom: '2px solid #D8D8D8',
            background: '#FFF',
            color: '#333',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
        }
    }
    if (type === 'icon') {
        return {
            minWidth: '40px',
            maxWidth: '300px',
            height: '56px',
            padding: '15px 16px 15px 16px',
            textAlign: 'center',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '18.2px',
            borderBottom: '2px solid #D8D8D8',
            background: '#FFF',
            color: '#333',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
        }
    }
};

export const boxStyle = {
    //padding: '11px 14px 11px 14px',
    weight: '100%',
    textAlign: 'right',
    alignItems: 'right',
    borderTop: '1px solid #A1A1A1',
    background: '#FFF',
    marginLeft: '0px'
};

export const label1Style = {
    fontFamily: 'Roboto',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
    color: '#333'
};

export const label2Style = {
    fontFamily: 'Roboto',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
    color: '#333',
    paddingRight: '31px',
    paddingLeft: '31px'
};