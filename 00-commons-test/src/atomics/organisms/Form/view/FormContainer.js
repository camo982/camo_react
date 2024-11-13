/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 * Grupo de Asesores Profesionales en Servicios de Integración (GAPSI) - CDMX - 2024
 *
 * @author: Diego Valencia [11/07/2024]
 * @updated: ---
 * @description: ---
 * @version 1.0.0
*/

import React, { useState } from 'react'
import View from './Form.jsx'

const FormContainer = props => {
    const [formValues, setFormValues] = useState({});
    const onChangeInput = (e, item) => {
        let copyfilters = structuredClone(filters);
        let indexOf = copyfilters.findIndex(filter => filter.name === item.name);
        if (indexOf >= 0) {
            copyfilters.splice(indexOf, 1)
        }
        copyfilters.push({
            name: item.name,
            value: e.target.value,
            label: item.label
        })

        setFilters(copyfilters)
        setFormValues({ ...formValues, [item.name]: e.target.value })
    }

    return (
        <View
            onChangeInput={onChangeInput}
            formValues={formValues}
            {...props}
        />
    )
}

FormContainer.propTypes = {}

export default FormContainer
