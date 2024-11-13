/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Julio Fuentes [17/09/2024]
 * @updated: --
 * @description: Creación de Molécula Dialog
 * @version 1.0.0
*/

import { types } from './modalTypes.js'

export const modalReducer = (state, action) => {
  switch (action.type) {
    case types.showModal:
      return {
        ...state,
        shouldShowModal: !state.shouldShowModal,
        cancelRequestAction: null,
        children: []
      }
    case types.closeModal:
      return {
        ...state,
        shouldShowModal: action.payload,
        cancelRequestAction: null
      }
    case types.handleSetContent:
      return {
        ...state,
        shouldShowModal: !state.shouldShowModal,
        children: action.payload.data,
        cancelRequestAction: null,
        className: action.payload?.className,
        size: action.payload?.size,
        isKeepOpen: action.payload.isKeepOpen,
        extraClassContainer: action.payload?.extraClassContainer,
        customRequestClose: action.payload?.customRequestClose
      }

    default:
      return {
        ...state
      }
  }
}
