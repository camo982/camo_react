/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Diego Valencia [11/07/2024]
 * @updated: ---
 * @description: ---
 * @version 1.0.0
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './DragTable.scss';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';

function DragTable({
  extraClass,
  dataTable,
  legend,
  emptyColumn,
  isSortable,
  isMoveColumns,
  handleSort
}) {
  const [columns, setColumns] = useState([]);
  const [initDrag, setInitDrag] = useState(false);

  useEffect(() => {
    if (dataTable?.headers && dataTable?.content) {
      const newColumns = dataTable.headers.map((header, index) => ({
        header: header.header,
        order: header.order,
        propertySearch: header.propertySearch,
        checkLength: header.checkLength,
        content: dataTable.content.map(row => row[index])
      }));
      setColumns(newColumns);
      setInitDrag(true);
    }
  }, [dataTable]);

  useEffect(() => {
    if (initDrag) {
      setTimeout(() => {
        if (isMoveColumns) {
          init();
        }
      }, 1000);
    }
  }, [initDrag]);

  function init() {
    let dragSrcEl = null;
    let cols = null;

    setUpEventListeners();

    function setUpEventListeners() {
      cols = document.querySelectorAll(`.colhead${colTag}`);

      cols.forEach(function (col, index) {
        col.style.order = index;
        col.addEventListener('dragstart', colDragStart, false);
        col.addEventListener('dragenter', colDragEnter, false);
        col.addEventListener('dragleave', colDragLeave, false);
        col.addEventListener('dragover', colDragOver, false);
        col.addEventListener('drop', colDrop, false);
        col.addEventListener('dragend', colDragEnd, false);
      });

      Array.from({ length: dataTable?.content.length }).forEach((_, rowIndex) => {
        columns.forEach((col, colIndex) => {
          const id = document.getElementById(`${colTag}col-${rowIndex}-${colIndex}`);
          if (id) {
            id.style.order = colIndex;
          }
        });
      });
    }

    function colDragStart(e) {
      this.style.opacity = '0.4';
      dragSrcEl = this;
    }

    function colDragEnter(e) {
      this.classList.add('over');
      const tempOrder = this.style.order;
      this.style.order = dragSrcEl.style.order;
      dragSrcEl.style.order = tempOrder;
    }

    function colDragLeave(e) {
      this.classList.remove('over');
    }

    function colDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      return false;
    }

    function colDrop(e) {
      e.stopPropagation();
      return false;
    }

    function colDragEnd(e) {
      this.style.opacity = '1';
      cols.forEach(function (col) {
        col.classList.remove('over');
      });
    }
  }

  return (
    <>
      <div className={`col-container is-header ${extraClass ?? ''}`}>
        {columns.map((col, index) => (
          <div
            key={`header-${index}`}
            id={`col-${index}`}
            className={`col col-head-${index} ${`col-order-${index}`} colhead${colTag}`}
            draggable="true"
            data-index={index}
            style={{
              width: `calc(100% / ${columns.length})`,
              cursor: isMoveColumns ? 'move' : 'auto'
            }}
            onClick={() => {
              if (isSortable) {
                handleSort(col, index);
              }
            }}
          >
            <section className="header-table">
              {isMoveColumns && <DragIndicatorOutlinedIcon />}
              {col.header}
              {isSortable && <SwapVertOutlinedIcon />}
            </section>
          </div>
        ))}
      </div>

      <section className="scrolltable">
        {columns.length > 0 ? (
          Array.from({ length: dataTable?.content.length }).map((_, rowIndex) => (
            <div className={`col-container ${extraClass ?? ''}`} key={`row-${rowIndex}`}>
              {columns.map((col, colIndex) => (
                <div
                  key={`col-${rowIndex}-${colIndex}`}
                  id={`${colTag}col-${rowIndex}-${colIndex}`}
                  className={`col col-content-${colIndex} ${col.content[rowIndex]?.extraClass ?? ''} ${`col-order-${colIndex}`} colcolm${colTag}`}
                  style={{
                    width: `calc(100% / ${columns.length})`,
                    cursor: isMoveColumns ? 'move' : 'auto'
                  }}
                  draggable="true"
                  data-index={colIndex}
                >
                  <section className="content-table">
                    {col.content[rowIndex]?.content ?? col.content[rowIndex]}
                  </section>
                </div>
              ))}
            </div>
          ))
        ) : emptyColumn ? (
          <div className={`col-container ${extraClass ?? ''}`}>
            <div
              id={`col-fixed`}
              className="col"
              draggable="true"
              style={{
                width: `calc(100%)`,
                cursor: isMoveColumns ? 'move' : 'auto'
              }}
            >
              <section
                className="content-table"
                style={{
                  padding: '16px 16px 0',
                  color: 'rgb(157 153 153)'
                }}
              >
                <p>{legend}</p>
              </section>
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}

DragTable.defaultProps = {
  extraClass: '',
  legend: '',
  isSortable: true,
  isMoveColumns: true,
  emptyColumn: true,
  handleSort: () => { },
};

DragTable.propTypes = {
  extraClass: PropTypes.string,
  dataTable: PropTypes.shape({
    headers: PropTypes.arrayOf(
      PropTypes.shape({
        header: PropTypes.string.isRequired,
        order: PropTypes.number,
        propertySearch: PropTypes.string,
        checkLength: PropTypes.number,
      })
    ).isRequired,
    content: PropTypes.arrayOf(PropTypes.array).isRequired,
  }).isRequired,
  legend: PropTypes.string,
  isSortable: PropTypes.bool,
  isMoveColumns: PropTypes.bool,
  emptyColumn: PropTypes.bool,
  handleSort: PropTypes.func,
};

export default DragTable;
