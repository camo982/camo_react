/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Julio Fuentes [13/09/2024]
 * @updated: ---
 * @description: ---
 * @version 1.0.0
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown as DropdownLiv } from '@lp_front_account/lp-kit-dashboards/';
import styles from './Dropdown.module.scss';

const Dropdown = ({ children, icon, mandatory, error, title, className, openFirst, open, onOpenChange }) => {

  return (
    <div className={styles['dropDown-module']}>
      <DropdownLiv
        icon={icon}
        mandatory={mandatory}
        error={error}
        title={title}
        openFirst={openFirst}
        open={open}
        onOpenChange={onOpenChange}
        className={className}
      >
        {children}
      </DropdownLiv>
    </div>
  );
}

Dropdown.propTypes = {
  /** This is all the content that you need inside the dropdowns body */
  children: PropTypes.node,
  /** This icon should be either a mateiral UI icon or a react component made out of an SVG */
  icon: PropTypes.node,
  /** This prop is for displaying the 'Campos obligatorios' flag on the header of the dropdown */
  mandatory: PropTypes.bool,
  /** This prop is for displaying the header text in red with a red icon */
  error: PropTypes.bool,
  /** The title for the header */
  title: PropTypes.string,
  /** Extraclass */
  className: PropTypes.string,
  /** This prop should be passed if you need the dropdown to be opened when rendered for the first time */
  openFirst: PropTypes.bool,
  /** Controlled state for handling open state of dropdown */
  open: PropTypes.bool,
  /** Callback to handle change of open state of dropdown */
  onOpenChange: PropTypes.func
}

export default Dropdown;
