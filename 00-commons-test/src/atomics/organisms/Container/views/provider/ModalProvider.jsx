/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Julio Fuentes [17/09/2024]
 * @updated: --
 * @description: Creación de Molécula Dialog
 * @version 1.0.0
*/

import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { modalReducer } from './reducer.js';
import { types } from './modalTypes.js';

export const Context = createContext({})

const MODAL_INITIAL_STATE = {
  shouldShowModal: false,
  size: '',
  className: '',
  children: [],
  extraClassContainer: '',
  customRequestClose: null
}

export const Model = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, MODAL_INITIAL_STATE)

  const handleShowModal = size => {
    dispatch({
      type: types.showModal,
      payload: size
    })
  }

  const onRequestClose = () => {
    dispatch({
      type: types.closeModal,
      payload: false
    })
  }

  const setModalContent = (data, size, className, isKeepOpen, extraClassContainer, customRequestClose) => {
    const setModal = { data, size, className, isKeepOpen, extraClassContainer, customRequestClose };
    dispatch({
      type: types.handleSetContent,
      payload: setModal
    })
  }

  return (
    <Context.Provider
      value={{
        ...state,
        setModalContent,
        onRequestClose,
        handleShowModal
      }}>
      {children}
    </Context.Provider>
  )
}

Model.propTypes = {
  children: PropTypes.object
}
