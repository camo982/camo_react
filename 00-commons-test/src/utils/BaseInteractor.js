/**
 * Copyright (c) 2023 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2023
 *
 * @author: Diego Valencia [13/09/2024]
 * @updated: ---
 * @description: .
 * @version 1.0.0
**/

class BaseInteractor {

    async makeRequest(url, method, headers, body, isBlob = false) {
        let response;
        let responseData = null;
        let baseResponse = {}
        try {
            if (body !== undefined) {
                response = await fetch(url, {
                    method,
                    headers,
                    body: (body instanceof FormData) ? body : JSON.stringify(body)
                });
            }
            else {
                response = await fetch(url, {
                    method,
                    headers
                });
            }
            if (url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('?')) == 'download-file') {
                responseData = await response.blob();
            } else {
                responseData = await response.json();
            }

        } catch (error) {
            if (response && response.status) {
                responseData = { code: response.status };
            }
        }
        if (isBlob) {
            baseResponse = {
                blob: responseData
            }
        } else {
            baseResponse = {
                code: responseData.code,
                description: responseData.description,
                data: responseData.data
            };
        }
        return baseResponse
    }
}

export default BaseInteractor;
