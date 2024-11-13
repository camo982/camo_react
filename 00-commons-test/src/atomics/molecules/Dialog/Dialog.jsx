/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Julio Fuentes [11/10/2024]
 * @updated: ---
 * @description: ---
 * @version 1.0.0
*/

import PropTypes from 'prop-types';
import React from 'react';
import { Sidebar } from '@lp_front_account/lp-kit-dashboards/';


const Dialog = ({ open, children, handleClose }) => {

    return (
        <Sidebar
            open={open}
            handleClose={handleClose}
        >
            <>
                {children}
            </>
        </Sidebar>
    );
}

Dialog.propTypes = {
    /** This prop is the content of the sidebar itself, with its own logic, you can either pass it alone or
    * you can pass some special childs which are: <Sidebar.Header> <Sidebar.Content> and <Sidebar.Footer>
    * with their respective closing tags each, this will separate the content in the sidebar and give it a box-shadow effect */
    children: PropTypes.node,
    /** This prop is to handle the state to either show or hide the sidebar. */
    open: PropTypes.bool,
    /** This is a function that sets the open state in the previous line to false, you only need to pass this prop if you need the sidebar to close automatically when clicking outside of it. */
    handleClose: PropTypes.func
}

export default Dialog;