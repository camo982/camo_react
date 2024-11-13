/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Julio Fuentes [15/10/2024]
 * @updated: ---
 * @description: Creación del Template CRUD
 * @version 1.0.0
*/

import PropTypes from 'prop-types';
import React from 'react';
//import intl from 'react-intl-universal';
import styles from './CRUD.module.scss';
import { HeadComponent } from './components/index.js';
//
//
import { Hide } from '../../atoms/Hide/Hide.jsx';
import GridTable from '../../organisms/GridTable/GridTable.jsx'

const Crud = props => {
    const {
        title,
        idTextField,
        searchGrant,
        rowsPerPage,
        dataLength,
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
        currentPage,
        customChildrenCellHead,
        customChildrenCellBody,
        isColumnActionsActive,
        handlePagination,
        handleRowsXpage,
        handleOnSort,
        onChangeText,
        onClickButonNew,
        handleOnInfo,
        handleOnDelete,
        handleOnEdit
    } = props

    return (
        <section className={styles.crud}>
            {/*<Hide grant={searchGrant} className={styles['search-panel']}>*/}
            <div className={styles.containerHead}>
                <HeadComponent
                    title={title}
                    idTextField={idTextField}
                    onChangeText={onChangeText}
                    onClickButonNew={onClickButonNew}
                    txtComponents={txtComponents}
                />
            </div>
            <div className={styles.containerGrid}>
                <GridTable
                    txtComponents={txtComponents}
                    rowsPerPage={rowsPerPage}
                    dataLength={dataLength}
                    currentPage={currentPage}
                    handlePagination={handlePagination}
                    handleRowsXpage={handleRowsXpage}
                    data={data}
                    dataHead={dataHead}
                    customChildrenCellHead={customChildrenCellHead}
                    customChildrenCellBody={customChildrenCellBody}
                    handleOnSort={handleOnSort}
                    isColumnActionsActive={isColumnActionsActive}
                    handleOnInfo={handleOnInfo}
                    handleOnDelete={handleOnDelete}
                    handleOnEdit={handleOnEdit}
                    tooltipConfiguration={tooltipConfiguration}
                />
            </div>
            {/*</Hide>*/}
        </section>
    );
};

Crud.propTypes = {
    /**Título del componente */
    title: PropTypes.string,
    /** Id del textfield*/
    idTextField: PropTypes.string,
    /** ¿Cuantas filas mostraré por página*/
    rowsPerPage: PropTypes.object,
    /** Página actual*/
    currentPage: PropTypes.number,
    /**Estilo de la caja o contenedor principal */
    boxStyle: PropTypes.object,
    /**Estilo de la la etiqueta uno */
    label1Style: PropTypes.object,
    /**Estilo de la la etiqueta dos */
    label2Style: PropTypes.object,
    /** ¿Cuántas filas en total hay?*/
    dataLength: PropTypes.number,
    /** Data del tablegrid */
    data: PropTypes.array,
    /** Data Head del tablegrid */
    dataHead: PropTypes.array,
    /** estilo personalizado para el TableContainer del grid */
    sxTableContainerGrid: PropTypes.object,
    /** estilo personalizado para el Table del grid */
    sxTableGrid: PropTypes.object,
    /** estilo personalizado para el TableHead del grid */
    sxTableHeadGrid: PropTypes.object,
    /** estilo personalizado para el Row del Head del grid */
    sxTableRowGridHead: PropTypes.object,
    /**textos para los componentes */
    txtComponents: PropTypes.array,
    /** estilo personalizado para la celda del Head del grid */
    sxTableCellGridHead: PropTypes.object,
    /** estilo personalizado para el TableBody del grid */
    sxTableBodyGrid: PropTypes.object,
    /** estilo personalizado para el Row del Body del grid */
    sxTableRowHGridBody: PropTypes.object,
    /** estilo personalizado para la celda del body del grid */
    sxTableCellGridBody: PropTypes.object,
    /** Página actual*/
    currentPage: PropTypes.number,
    /** Celda customizada para el encabezado de la tabla */
    customChildrenCellHead: PropTypes.node,
    /** Celda customizada para el body de la tabla */
    customChildrenCellBody: PropTypes.node,
    /**Configuración para el consumo de la información del tooltip de auditoria */
    tooltipConfiguration: PropTypes.array,
    /**Indica si la columna de acciones se activa dentro del grid */
    isColumnActionsActive: PropTypes.bool,
    /** Maneja la paginación*/
    handlePagination: PropTypes.func.isRequired,
    /** Maneja la las filas por página*/
    handleRowsXpage: PropTypes.func.isRequired,
    /** Habilita  el evento onChangeText del componente TextField*/
    onChangeText: PropTypes.func,
    /** Habilita  el evento onClick del componente Button*/
    onClickButonNew: PropTypes.func,
    /**Manejador de evento al dar clic en el ícono ordenar del head de la columna*/
    handleOnSort: PropTypes.func,
    /** Manejar el evento info de la fila del grid*/
    handleOnInfo: PropTypes.func,
    /** Manejar el evento eliminar de la fila del grid*/
    handleOnDelete: PropTypes.func,
    /** Manejar el evento editar de la fila del grid*/
    handleOnEdit: PropTypes.func
};

export default Crud;