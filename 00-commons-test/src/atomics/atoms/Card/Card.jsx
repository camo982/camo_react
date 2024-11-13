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
import './Card.module.scss'

const Card = ({ children, className = '', customId = (new Date().getTime()).toString() }) => {
  return <div className={`cardBox ${className}`} id={customId}>{children}</div>
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ]),
  className: PropTypes.string,
  customId: PropTypes.string
}

export default Card
