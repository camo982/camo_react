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
import Button from '../../../atoms/Button/Button.jsx';
import styles from './NotAvailable.module.scss';

const View = ({ subTitle, text, hasRetryBtn, handleRetry, handleReturn, resetErrorBoundary = () => { } }) => {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.divImage}>
          <img
            className={styles.img}
            src={LabelsManager.getLabel(
              'HOME_GUESS',
              'HOME_GUESS_NOT_FOUND_IMAGE',
              'https://assetsmcdev.liverpool.com.mx/cdn/liverpool/assets/images/notfound/not-found.png'
            )}
            alt=""
          />
        </div>
        <div className={styles.title}>
          {LabelsManager.getLabel(
            'HOME_GUESS',
            'HOME_GUESS_NOT_FOUND_TITLE',
            '¡Lo sentimos!'
          )}
        </div>
        <div className={styles.subTitle}>{subTitle}</div>
        <div className={styles.text}>{text}</div>
        {hasRetryBtn
          ? (
            <div className={styles.btnContainer}>
              <Button
                btnType={'default'}
                className={styles.btnReturn}
                size={'md'}
                onClick={() => {
                  resetErrorBoundary()
                  handleRetry(true)
                }}>
                <span>
                  {LabelsManager.getLabel(
                    'HOME_GUESS',
                    'HOME_GUESS_NOT_FOUND_BTN_RETRY',
                    'Volver a cargar la página'
                  )}{' '}
                </span>
              </Button>
              <Button
                btnType={'main'}
                size={'md'}
                onClick={() => {
                  resetErrorBoundary()
                  handleReturn()
                }}>
                <span>
                  {LabelsManager.getLabel(
                    'HOME_GUESS',
                    'HOME_GUESS_NOT_FOUND_BTN_RETURN',
                    'Regresar'
                  )}{' '}
                </span>
              </Button>
            </div>
          )
          : (
            <div className={styles.divider}></div>
          )}
        <div className={styles.help}>
          {LabelsManager.getLabel(
            'HOME_GUESS',
            'HOME_GUESS_NOT_FOUND_QUESTION',
            '¿Necesitas asistencia? Comunícate con nosotros al:'
          )}
        </div>
        <div className={styles.number}>
          {LabelsManager.getLabel(
            'HOME_GUESS',
            'HOME_GUESS_NOT_FOUND_NUMBER',
            '55 52 62 99 99'
          )}
        </div>
      </div>
    </>
  )
};

View.propTypes = {
  subTitle: PropTypes.string,
  text: PropTypes.string,
  hasRetryBtn: PropTypes.bool,
  resetErrorBoundary: PropTypes.func,
  handleRetry: PropTypes.func,
  handleReturn: PropTypes.func
};

View.defaultProps = {
};

export default View;
