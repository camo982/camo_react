/**
 * Copyright (c) 2023 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2023
 *
 * @author: Julio Fuentes [19/09/2024]
 * @updated: ---
 * @description:
 * @version 1.0.0
 **/

import { isNotEmpty } from "./helpers";

//const { isNotEmpty } = HelpersFunctions;

const MESSAGES = {
    'default': {
        'default': 'Something went wrong'
    },
    'getAll': {
        'default': 'Por favor intenta de nuevo'
    },
    'create': {
        'default': 'Ocurrió un error, inténtalo más tarde'
    },
    'massiveCreate': {
        'default': 'Ocurrió un error, inténtalo más tarde'
    },
    'update': {
        'default': 'Ocurrió un error, inténtalo más tarde'
    },
    'delete': {
        'default': 'Ocurrió un error, inténtalo más tarde'
    }
}

const getErrorMessage = ({ method, code }) => {
    let errorMessage = MESSAGES['default']['default']
    if (isNotEmpty(MESSAGES[method])) {
        errorMessage = MESSAGES[method]['default']
    }
    if (isNotEmpty(MESSAGES[method][code])) {
        errorMessage = MESSAGES[method][code]
    }
    return errorMessage
}

export const getAllErrorMessagesManager = ({ code }) => {
    let errorMessage = getErrorMessage({ method: 'getAll', code })
    return errorMessage
}

export const createErrorMessagesManager = ({ code }) => {
    let errorMessage = getErrorMessage({ method: 'create', code })
    return errorMessage
}

export const updateErrorMessagesManager = ({ code }) => {
    let errorMessage = getErrorMessage({ method: 'update', code })
    return errorMessage
}

export const deleteErrorMessagesManager = ({ code }) => {
    let errorMessage = getErrorMessage({ method: 'delete', code })
    return errorMessage
}

export const massiveCreateErrorMessagesManager = ({ code }) => {
    let errorMessage = getErrorMessage({ method: 'massiveCreate', code })
    return errorMessage
}

export default {
    getAllErrorMessagesManager,
    createErrorMessagesManager,
    updateErrorMessagesManager,
    deleteErrorMessagesManager,
    massiveCreateErrorMessagesManager

}