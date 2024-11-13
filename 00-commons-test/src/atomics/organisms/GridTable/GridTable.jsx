/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Julio Fuentes [18/10/2024]
 * @updated: ---
 * @description: Creación del template GridTable
 * @version 1.0.0
*/

import PropTypes from 'prop-types';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paginator } from '../Paginator/index.js'
import { sxTableContainer, sxTable, sxTableHead, sxTableRowHead } from './components/styles.js';
import { sxTableBody, sxTableRowHBody, boxStyle, label1Style, label2Style } from './components/styles.js';
import { childrenHeadCell, childrenBodyCell, childrenBodyCellActions } from './components/Components.js';
import Utils from '../../../utils/utils.js';
import LabelsManager from '../../../utils/LabelsManager.js';
import intl from 'react-intl-universal';

const GridTable = props => {
    const {
        rowsPerPage,
        dataLength,
        currentPage,
        data,
        dataHead,
        txtComponents,
        tooltipConfiguration,
        sxTableContainerGrid,
        sxTableGrid,
        sxTableHeadGrid,
        sxTableRowGridHead,
        sxTableCellGridHead,
        sxTableBodyGrid,
        sxTableRowHGridBody,
        sxTableCellGridBody,
        isColumnActionsActive,
        customChildrenCellHead,
        customChildrenCellBody,
        handlePagination,
        handleRowsXpage,
        handleOnSort,
        handleOnInfo,
        handleOnDelete,
        handleOnEdit
    } = props

    const actionsTxt = (
        LabelsManager.getLabelTraductor(
            intl,
            (txtComponents[0]['HEAD_A'].idTxt),
            (txtComponents[0]['HEAD_A'].txtIfNull)
        )
    );

    return (
        <TableContainer sx={sxTableContainerGrid ? sxTableContainerGrid : sxTableContainer}>
            <Table sx={sxTableGrid ? sxTableGrid : sxTable} size='small'>
                <TableHead sx={sxTableHeadGrid ? sxTableHeadGrid : sxTableHead}>
                    <TableRow
                        key={(Utils.getUUID())}
                        sx={sxTableRowGridHead ? sxTableRowGridHead : sxTableRowHead}>
                        {
                            dataHead.map((column) => {
                                if (!column.hidden) {
                                    return (
                                        childrenHeadCell(column.key, column.column, column.type,
                                            column.sort, sxTableCellGridHead, customChildrenCellHead,
                                            handleOnSort
                                        )
                                    );
                                } else { return ''; }
                            })
                        }
                        {
                            isColumnActionsActive ?
                                <>
                                    {
                                        childrenHeadCell('-1', actionsTxt, 'icon',
                                            false, '', '', ''
                                        )
                                    }
                                </>
                                :
                                ''
                        }
                    </TableRow>
                </TableHead>
                <TableBody sx={sxTableBodyGrid ? sxTableBodyGrid : sxTableBody}>
                    {
                        data.map((row) => (
                            <TableRow
                                key={(Utils.getUUID())}
                                sx={sxTableRowHGridBody ? sxTableRowHGridBody : sxTableRowHBody}
                            >
                                {
                                    dataHead.map((column) => {
                                        if (row[column.key] && !column.hidden) {
                                            return (
                                                childrenBodyCell(row[column.key], column.type, sxTableCellGridBody,
                                                    customChildrenCellBody
                                                )
                                            );
                                        } else { return ''; }
                                    })
                                }
                                {
                                    isColumnActionsActive ?
                                        <>
                                            {
                                                childrenBodyCellActions(row, handleOnInfo, handleOnDelete, handleOnEdit, tooltipConfiguration)
                                            }
                                        </>
                                        :
                                        ''
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <Paginator
                rowsPerPage={rowsPerPage}
                dataLength={dataLength}
                currentPage={currentPage}
                boxStyle={boxStyle}
                txtComponents={txtComponents}
                label1Style={label1Style}
                label2Style={label2Style}
                handlePagination={handlePagination}
                handleRowsXpage={handleRowsXpage}
            />
        </TableContainer>
    );
};

GridTable.propTypes = {
    /** ¿Cuantas filas mostraré por página*/
    rowsPerPage: PropTypes.object,
    /** ¿Cuántas filas en total hay?*/
    dataLength: PropTypes.number,
    /** Página actual*/
    currentPage: PropTypes.number,
    /** Data del tablegrid */
    data: PropTypes.array,
    /** Data Head del tablegrid */
    dataHead: PropTypes.array,
    /**textos para los componentes */
    txtComponents: PropTypes.array,
    /**Configuración para el consumo de la información del tooltip de auditoria */
    tooltipConfiguration: PropTypes.array,
    /** estilo personalizado para el TableContainer del grid */
    sxTableContainerGrid: PropTypes.object,
    /** estilo personalizado para el Table del grid */
    sxTableGrid: PropTypes.object,
    /** estilo personalizado para el TableHead del grid */
    sxTableHeadGrid: PropTypes.object,
    /** estilo personalizado para el Row del Head del grid */
    sxTableRowGridHead: PropTypes.object,
    /** estilo personalizado para la celda del Head del grid */
    sxTableCellGridHead: PropTypes.object,
    /** estilo personalizado para el TableBody del grid */
    sxTableBodyGrid: PropTypes.object,
    /** estilo personalizado para el Row del Body del grid */
    sxTableRowHGridBody: PropTypes.object,
    /** estilo personalizado para la celda del body del grid */
    sxTableCellGridBody: PropTypes.object,
    /**Indica si la columna de acciones se activa dentro del grid */
    isColumnActionsActive: PropTypes.bool,
    /** Celda customizada para el encabezado de la tabla */
    customChildrenCellHead: PropTypes.node,
    /** Celda customizada para el body de la tabla */
    customChildrenCellBody: PropTypes.node,
    /** Maneja la paginación*/
    handlePagination: PropTypes.func.isRequired,
    /** Maneja la las filas por página*/
    handleRowsXpage: PropTypes.func.isRequired,
    /**Manejador de evento al dar clic en el ícono ordenar del head de la columna*/
    handleOnSort: PropTypes.func,
    /** Manejar el evento info de la fila del grid*/
    handleOnInfo: PropTypes.func,
    /** Manejar el evento eliminar de la fila del grid*/
    handleOnDelete: PropTypes.func,
    /** Manejar el evento editar de la fila del grid*/
    handleOnEdit: PropTypes.func
};


export default GridTable;