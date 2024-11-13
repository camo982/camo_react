/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Julio Fuentes [17/09/2024]
 * @updated: --
 * @description: Creación de Molécula Dialog
 * @version 1.0.0
*/

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Context as ModalContext, Model } from './provider/ModalProvider.jsx';
import { View } from './Modal.jsx';

const ModalContainer = (props) => {

  const { hasCloseButton } = props;
  const {
    size,
    className,
    setModalContent,
    children,
    extraClassContainer,
    customRequestClose,
    handleShowModal,
    onRequestClose,
    isKeepOpen,
    shouldShowModal
  } = useContext(ModalContext);

  return (
    <>
      {shouldShowModal && (
        <View
          hasCloseButton={hasCloseButton}
          size={size}
          className={className}
          shouldShowModal={shouldShowModal}
          setModalContent={setModalContent}
          onRequestClose={onRequestClose}
          handleShowModal={handleShowModal}
          isKeepOpen={isKeepOpen}
          extraClassContainer={extraClassContainer}
          customRequestClose={customRequestClose}>
          {children}
        </View>
      )}
    </>
  )
};

ModalContainer.propTypes = {
  /** Habilitar el botón CloseButton*/
  hasCloseButton: PropTypes.bool
};

ModalContainer.defaultProps = {
  hasCloseButton: true
};

const ModalBox = ({ children, hasCloseButton }) => {
  return (
    <Model>
      {children}
      <ModalContainer {...{ hasCloseButton }} />
    </Model>
  )
};

ModalBox.propTypes = {
  /** Componente hijo*/
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  /** Habilitar el botón CloseButton*/
  hasCloseButton: PropTypes.bool
};

ModalBox.defaultProps = {
  hasCloseButton: true
};

export default ModalBox;
