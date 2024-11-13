/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2024
 *
 * @author: Diego Valencia [10/10/2024]
 * @updated: ---
 * @description: ---
 * @version 1.0.0
**/

import Presenter from './Presenter';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import intl from 'react-intl-universal';

const presenter = new Presenter('http://localhost:8079');

export const useApiHandler = (strategy) => {
    const { execute, loading } = useStrategicAction();

    const generalHandler = (data, callback) => {
        if (typeof presenter[strategy] !== 'function') {
            callback({ success: false, error: intl.get('LABELS_STRATEGY') });
            return;
        }

        execute(presenter[strategy], data, callback);
    };

    return { generalHandler, loading };
};

export const useHandleActionError = () => {
    const navigate = useNavigate();

    const handleActionError = () => {
        const errorfallback = sessionStorage.getItem('errorfallback');
        if (!errorfallback) {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const enabled = urlParams.get('enabled');

            sessionStorage.removeItem('errorfallback');
            navigate(enabled === '0' ? '/home' : '/');
            return;
        }
        sessionStorage.setItem('errorfallback', '/home');
        location.href = '/';
    }
    return handleActionError;
};

export const useStrategicAction = () => {
    const [loading, setLoading] = useState(false);
    const execute = async (strategy, row, callback) => {
        setLoading(true);
        try {
            const response = await strategy(row);
            setLoading(false);
            callback({ success: true, data: response });
        } catch (error) {
            setLoading(false);
            callback({ success: false, error });
        }
    };
    return { execute, loading, setLoading };
};

export default {
    useApiHandler,
    useStrategicAction
};
