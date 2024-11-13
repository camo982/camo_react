/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Julio Fuentes [17/09/2024]
 * @updated: --
 * @description: Creación de Molécula Dialog
 * @version 1.0.0
*/

import React from 'react';
import PropTypes from 'prop-types';

export const View = props => {

  const { size, className, children, hasCloseButton, isKeepOpen, extraClassContainer, customRequestClose, onRequestClose } = props;
  const [header, body, footer] = children;

  return (
    <section onClick={e => isKeepOpen ? false : (customRequestClose ? customRequestClose() : onRequestClose(e))}>
      <div
        onClick={e => e.stopPropagation()}>
        {
          header &&
          <div>
            {header}
            {
              hasCloseButton ? <button onClick={() => {
                if (customRequestClose) {
                  customRequestClose();
                } else {
                  onRequestClose();
                }
              }}>X</button> : <></>
            }
          </div>
        }
        <div >{body}</div>
        {footer ? <div>{footer}</div> : null}
      </div>
    </section>
  )
}

View.propTypes = {
  /** Componente hijo*/
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  /** Tamaño del componente*/
  size: PropTypes.string,
  /** Agregar estilo al componente*/
  className: PropTypes.string,
  /** Habilitar el botón CloseButton*/
  hasCloseButton: PropTypes.bool,
  /** ¿El componente se mantiene abierto?*/
  isKeepOpen: PropTypes.bool,
  /** Agregar estilo al componente*/
  extraClassContainer: PropTypes.string,
  /** Función de cerrar personalizado*/
  customRequestClose: PropTypes.func,
  /** Función de cerrar costumizado*/
  onRequestClose: PropTypes.func
};

View.defaultProps = {
  hasCloseButton: true
};
