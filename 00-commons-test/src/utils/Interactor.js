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

import BaseInteractor from './BaseInteractor.js';

class Interactor {
    baseInteractor;
    context = "labels";

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.baseInteractor = new BaseInteractor();
    }

    async getAll({ parameters }) {
        const url = `${this.baseUrl}/${this.context}?${new URLSearchParams({ sortPaginator: parameters })}`;
        const headers = {
            'sessionId': 'c',
            brandId: 1
        };

        return this.baseInteractor.makeRequest(url, 'GET', headers);
    };

    async delete(parameters) {
        const url = `${this.baseUrl}/${this.context}?${new URLSearchParams({ items: parameters })}`;
        const headers = {
            "Content-Type": "application/json",
            'sessionId': 'c',
            brandId: 1,
        };

        return this.baseInteractor.makeRequest(url, 'DELETE', headers);
    };

    async create(body) {
        const url = `${this.baseUrl}/labels`;
        const headers = {
            "Content-Type": "application/json",
            'sessionId': 'c',
            brandId: 1
        };
        return this.baseInteractor.makeRequest(url, 'POST', headers, body);
    };

    async massiveCreate(data) {
        const url = `${this.baseUrl}/${this.context}/upload-file`;
        const headers = {
            'sessionId': 'c',
            brandId: 1
        };
        const formData = new FormData();
        for (const name in data) {
            formData.append(name, data[name]);
        }
        return this.baseInteractor.makeRequest(url, 'POST', headers, formData);
    }

    async update(body) {
        const url = `${this.baseUrl}/${this.context}`;
        const headers = {
            "Content-Type": "application/json",
            'sessionId': 'c',
            brandId: 1
        };

        return this.baseInteractor.makeRequest(url, 'PUT', headers, body);
    }

    async downloadFile({ parameters }) {
        const url = `${this.baseUrl}/${this.context}/download-file?${new URLSearchParams({ items: parameters })}`;
        const headers = {
            "Content-Type": "application/json",
            'sessionId': 'c',
            'brandId': 1,
            'headerTest': 1
        };

        return this.baseInteractor.makeRequest(url, 'GET', headers, undefined, true);
    }

    async publishUpdate(body) {
        const url = `${this.baseUrl}/${this.context}/pub`;
        const headers = {
            sessionId: 'c',
            'brandId': 1,
            'brand': 1,
            'headerTest': 1
        };
        return this.baseInteractor.makeRequest(url, 'POST', headers, body);
    }
}

export default Interactor;
