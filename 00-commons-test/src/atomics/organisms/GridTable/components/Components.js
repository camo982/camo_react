/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Julio Fuentes [18/10/2024]
 * @updated: ---
 * @description: Algunos componentes personalizados para el grid
 * @version 1.0.0
*/
import React from 'react';
import { sxTableCellHead, sxTableCellBody } from './styles.js';
import TableCell from '@mui/material/TableCell';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { IconButton } from '@mui/material';
import dayjs from 'dayjs';
import Tooltip from '../../../molecules/Tooltip/Tooltip.jsx';

function fecha(row, tooltipConfiguration, type) {
    if (row[tooltipConfiguration[0][type]]) {
        if (dayjs(row[tooltipConfiguration[0][type]], tooltipConfiguration[0]['dateFormatOrigin']).isValid()) {
            return dayjs(row[tooltipConfiguration[0][type]]).format(tooltipConfiguration[0]['dateFormatFinal']);
        }
    }
    return '';
}

function tiempo(row, tooltipConfiguration, type) {
    if (row[tooltipConfiguration[0][type]]) {
        if (dayjs(row[tooltipConfiguration[0][type]], tooltipConfiguration[0]['dateFormatOrigin']).isValid()) {
            return dayjs(row[tooltipConfiguration[0][type]]).format(tooltipConfiguration[0]['timeFormatFinal']);
        }
    }
    return '';
}

const customUnfoldMoreIcon = (key, handleOnSort) => {
    return (
        <IconButton
            onClick={async (e) => await handleOnSort(e, key)}
            aria-label="column sort">
            {
                <UnfoldMoreIcon
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: '20px',
                        color: '#767676'
                    }}
                />
            }
        </IconButton>
    );
};


export const childrenHeadCell = (key, column, type, sort, sxTableCellGridHead, customChildrenCellHead, handleOnSort) => {

    if (type === 'text') {
        return childrenHeadCellText(key, column, type, sort, sxTableCellGridHead, customChildrenCellHead, handleOnSort);
    } else {
        return childrenHeadCellIcon(key, column, type, sort, sxTableCellGridHead, customChildrenCellHead, handleOnSort);
    }
};

const childrenHeadCellText = (key, column, type, sort, sxTableCellGridHead, customChildrenCellHead, handleOnSort) => {

    const createCellContent = (key, handleOnSort) => {
        if (sort && !customChildrenCellHead) {
            return (
                <>
                    {column}
                    {customUnfoldMoreIcon(key, handleOnSort)}
                </>
            );
        }
        if (sort && customChildrenCellHead) {
            return (
                <>
                    {customChildrenCellHead}
                    {customUnfoldMoreIcon(key, handleOnSort)}
                </>
            );
        }
        if (!sort && customChildrenCellHead) {
            return (
                <>
                    {customChildrenCellHead}
                </>
            );
        }
        else {
            return (
                <>
                    {column}
                </>
            );
        }
    }
    return (
        <>
            <TableCell
                sx={sxTableCellGridHead ? sxTableCellGridHead : (sxTableCellHead(type))}
                key={key}
                size='small'
            >
                {createCellContent(key, handleOnSort)}
            </TableCell>
        </>
    );
};

const childrenHeadCellIcon = (key, column, type, sort, sxTableCellGridHead, customChildrenCellHead, handleOnSort) => {

    return (
        <>
            <TableCell
                sx={sxTableCellGridHead ? sxTableCellGridHead : (sxTableCellHead(type))}
                key={key}
                size='small'
            >
                {column ? column : ''}
                {customChildrenCellHead ? customChildrenCellHead : ''}
                {sort ? (customUnfoldMoreIcon(key, handleOnSort)) : ''}
            </TableCell>
        </>
    );
};

export const childrenBodyCell = (text, type, sxTableCellGridBody, customChildrenCellBody) => {

    if (type === 'text') {
        return (
            <TableCell
                sx={sxTableCellGridBody ? sxTableCellGridBody : (sxTableCellBody(type))}
                size='small'
            >
                {text}
            </TableCell>
        );
    } else {
        return (
            <TableCell
                sx={sxTableCellGridBody ? sxTableCellGridBody : (sxTableCellBody(type))}
                size='small'
            >
                {customChildrenCellBody ? customChildrenCellBody : text}
            </TableCell>
        );
    }
};

export const childrenBodyCellActions = (row, handleOnInfo, handleOnDelete, handleOnEdit, tooltipConfiguration) => {

    return (
        <TableCell
            sx={sxTableCellBody('icon')}
            size='small'
        >
            <Tooltip
                title={{
                    creation: {
                        name: (row[tooltipConfiguration[0]['createdUser']] ? row[tooltipConfiguration[0]['createdUser']] : ''),
                        date: fecha(row, tooltipConfiguration, 'createdDate'),
                        time: tiempo(row, tooltipConfiguration, 'createdDate')
                    },
                    modification: {
                        name: (row[tooltipConfiguration[0]['updatedUser']] ? row[tooltipConfiguration[0]['updatedUser']] : ''),
                        date: fecha(row, tooltipConfiguration, 'updatedDate'),
                        time: tiempo(row, tooltipConfiguration, 'updatedDate')
                    }
                }}
            >
                <IconButton
                    onClick={async (e) => await handleOnInfo(e, row)}
                    aria-label="row info">
                    {
                        <InfoOutlinedIcon
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: '22px',
                                color: '#767676',
                                background: '#FFF'
                            }}
                        />
                    }
                </IconButton>
            </Tooltip>
            <IconButton
                onClick={async (e) => await handleOnEdit(e, row)}
                aria-label="row info">
                {
                    <EditOutlinedIcon
                        style={{
                            fontFamily: 'Roboto',
                            fontSize: '22px',
                            color: '#767676',
                            background: '#FFF'
                        }}
                    />
                }
            </IconButton>
            <IconButton
                onClick={async (e) => await handleOnDelete(e, row)}
                aria-label="row info">
                {
                    <DeleteOutlinedIcon
                        style={{
                            fontFamily: 'Roboto',
                            fontSize: '22px',
                            color: '#767676',
                            background: '#FFF'
                        }}
                    />
                }
            </IconButton>
        </TableCell>
    );
};