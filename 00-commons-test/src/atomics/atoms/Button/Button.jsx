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
import styles from './Button.module.scss'

const Button = props => {
  const {
    disabled,
    children,
    type,
    className,
    size,
    handleAction,
    ...restProps
  } = props

  const setStylesBtn = type => {
    const typeOfButton = {
      default: styles.baseButton,
      main: styles.main,
      disabled: styles.disabled,
      outline: styles.triggerAction,
      secondary: styles.secondary,
      link: styles.link,
    }
    return typeOfButton[type] ?? ''
  }

  const setClassNameList = (className = []) => {
    if (Array.isArray(className)) {
      return className.map(item => `${styles[item] ?? item} `).join('')
    }
    return className
  }

  return (
    <button
      className={`${disabled ? styles.disabled : ''} ${setStylesBtn(type)} ${styles[size] ?? ''
        } ${setClassNameList(className)}`}
      disabled={disabled}
      onClick={handleAction}
      {...restProps}>
      {children}
    </button>
  )
}

Button.displayName = 'GenericButton'

Button.defaultProps = {
  disabled: false,
  type: 'default',
  size: '',
  handleAction: () => { }
}

Button.propTypes = {
  handleAction: PropTypes.func,
  size: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.any,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.array]),
  value: PropTypes.string
}

export default Button
