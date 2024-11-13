/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2024
 * 
 * @author: Julio Fuentes [18/09/2024]
 * @updated: ---
 * @description: .
 * @version 1.0.0
**/

import React from 'react';
import PropTypes from 'prop-types';
import LabelsManager from '../../../../utils/LabelsManager';
import StorageManager from '../../../../utils/StorageManager';
import View from './NotAvailable.jsx';

const NotAvailable = ({ redirect, resetErrorBoundary }) => {

  const handleTexts = () => {
    const errorfallback = sessionStorage.getItem('errorfallback')

    const messageFallback = `Reparaciones está temporalmente en mantenimiento.`

    const subTitle = !errorfallback
      ? LabelsManager.getLabel(
        'HOME_GUESS',
        'HOME_GUESS_NOT_FOUND_SUBTITLE',
        messageFallback
      )
      : LabelsManager.getLabel(
        'HOME_GUESS',
        'HOME_GUESS_NOT_FOUND_SUBTITLE_RETRY',
        messageFallback
      )
    const text = !errorfallback
      ? LabelsManager.getLabel(
        'HOME_GUESS',
        'HOME_GUESS_NOT_FOUND_TEXT',
        'Estamos trabajando para mejorar tu experiencia, estaremos de vuelta lo antes posible.'
      )
      : LabelsManager.getLabel(
        'HOME_GUESS',
        'HOME_GUESS_NOT_FOUND_TEXT_RETRY',
        'Estamos trabajando para mejorar tu experiencia, estaremos de vuelta lo antes posible. Vuelve a intentarlo en unos minutos.'
      )
    const hasRetryBtn = !errorfallback

    return {
      subTitle,
      text,
      hasRetryBtn
    }
  }

  const { subTitle, text, hasRetryBtn } = handleTexts()

  return (
    <>
      <View
        subTitle={subTitle}
        text={text}
        hasRetryBtn={hasRetryBtn}
        resetErrorBoundary={resetErrorBoundary}
        handleRetry={redirect}
        handleReturn={redirect}
      />
    </>
  )
};

NotAvailable.propTypes = {
  resetErrorBoundary: PropTypes.func,
  redirect: PropTypes.func
};

NotAvailable.defaultProps = {
};

export default NotAvailable;
