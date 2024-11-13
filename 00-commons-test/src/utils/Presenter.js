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

import Interactor from './Interactor';
import showAlertMessage from './dispatchCustomEvents.js'
import * as ErrorMessagesManager from './ErrorMessagesManager.js';
import intl from 'react-intl-universal';

const { createErrorMessagesManager, deleteErrorMessagesManager, getAllErrorMessagesManager, updateErrorMessagesManager, massiveCreateErrorMessagesManager } = ErrorMessagesManager;
const DOWNLOAD_DOCUMENT_URL = '';
const OPEN_TARGET_WINDOW = '_blank';

export default class Presenter {
    url;
    interactor;

    constructor(url) {
        this.url = url;
        this.interactor = new Interactor(url);
    }

    getAll = async (parameters) => {
        const response = await this.interactor.getAll({ parameters: parameters });
        if (response.code >= 300) {
            showAlertMessage({
                type: 'warning',
                message: getAllErrorMessagesManager(response)
            });
            return null;
        }
        return response.data;
    };

    create = async (body) => {
        const response = await this.interactor.create(body);
        if (response.code >= 300) {
            showAlertMessage({
                type: 'warning',
                message: createErrorMessagesManager(response)
            });
            return null;
        }
        showAlertMessage({
            type: 'success',
            message: intl.get('LABELS_ADD_APPLICATION')
        });
        return response.data || true;
    };

    massiveCreate = async (droppedFiles) => {
        const response = await this.interactor.massiveCreate(droppedFiles);
        if (response.code == 201) {
            if (response.data == undefined) {
                showAlertMessage({
                    type: 'success',
                    message: intl.get('LABELS_ADDED_SUCCESSFULLY')
                });
            }
            return response.data;
        } else if (response.code >= 300) {
            showAlertMessage({
                type: 'warning',
                message: massiveCreateErrorMessagesManager(response)
            });
            return null;
        }
        return response.data || true;
    };

    delete = async (body) => {
        const response = await this.interactor.delete(body);
        if (response.code >= 300) {
            showAlertMessage({
                type: 'warning',
                message: deleteErrorMessagesManager(response)
            });
            return null;
        }
        showAlertMessage({
            type: 'success',
            message: intl.get('LABELS_DELETED_SUCCESSFULLY')
        });
        return response.data || true;
    };

    update = async (body) => {
        const response = await this.interactor.update(body);
        if (response.code >= 300) {
            showAlertMessage({
                type: 'warning',
                message: updateErrorMessagesManager(response)
            });
            return null;
        }
        showAlertMessage({
            type: 'success',
            message: intl.get('LABELS_UPDATED_SUCCESSFULLY')
        });
        return response.data || true;
    };

    downloadFile = async (parameters) => {
        const response = await this.interactor.downloadFile({ parameters: parameters });
        if (response.code >= 300) {
            showAlertMessage({
                type: 'warning',
                message: updateErrorMessagesManager(response)
            });
            return null;
        }

        if (response.code == 0) {
            window.open(
                DOWNLOAD_DOCUMENT_URL.concat(response.downloadTransactionId),
                OPEN_TARGET_WINDOW
            );
        }

        showAlertMessage({
            type: 'success',
            message: intl.get('LABELS_DOWNLOAD_SUCCESSFULLY')
        });
        return response;
    };

    publishUpdate = async (body) => {
        const response = await this.interactor.publishUpdate(body);
        if (response.code >= 300) {
            showAlertMessage({
                type: 'warning',
                message: getAllErrorMessagesManager(response)
            });
            return null;
        }
        return response.data || true;
    };
}
