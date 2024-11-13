/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Diego Valencia [11/07/2024]
 * @updated: ---
 * @description: ---
 * @version 1.0.0
*/

import React from 'react'
import PropTypes from 'prop-types'
import styles from './Loading.module.scss'

export const Loading = ({ className }) => {
  return (
    <div className={`${styles.loadingConatiner} ${className}`}>
      <div className={styles.imageWrapperStyle}>
        <div class={styles.loader}></div>
      </div>
    </div>
  )
}

Loading.propTypes = {
  className: PropTypes.string
}
