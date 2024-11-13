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

import StorageManager from './StorageManager.js'

const OAUTH_TOKEN_EXPIRED = 'steps.jwt.TokenExpired'

class ServiceManager {
  baseUrl
  endpoint
  basic
  data
  brand
  countOauthErrors = 0
  tokenExpiredCode
  oauthCalled = false
  site = ''

  constructor(baseUrl, endpoint, basic, data, brand, tokenExpiredCode, site) {
    this.baseUrl = baseUrl
    this.endpoint = endpoint
    this.basic = basic
    this.data = data
    this.brand = brand
    this.tokenExpiredCode = tokenExpiredCode || OAUTH_TOKEN_EXPIRED
    this.site = site === null || site === '' || site === undefined ? '' : site
  }

  getPropManager = (object, keys, defaultVal) => {
    keys = Array.isArray(keys) ? keys : keys.split('.')
    object = object[keys[0]]
    if (object && keys.length > 1) {
      return this.getPropManager(object, keys.slice(1))
    }
    return object === undefined ? defaultVal : object
  }

  getApplicationKey = () => {
    return getPropManager(
      JSON.parse(StorageManager.getSessionStorage(THEME_STORAGE_KEY)),
      'applicationKey'
    )
  }

  fetchWithOauth = async (baseUrl, endpoint, data, method, headers, isBlob = false) => {
    let authToken = StorageManager.getSessionStorage('TOKEN_DATA')
    if (
      authToken === null ||
      authToken === '' ||
      authToken === undefined ||
      authToken === ' '
    ) {
      StorageManager.setSessionStorage('TOKEN_DATA', ' ')
      const jsonTokenData = await this.fetchOauth(
        this.baseUrl,
        this.endpoint,
        this.basic,
        this.data
      )
      if (jsonTokenData) {
        authToken = jsonTokenData.access_token
        StorageManager.setSessionStorage('TOKEN_DATA', authToken)
      } else {
        if (this.countOauthErrors > 3) {
          return { ok: false, message: 'Fallo el servicio de oauth' }
        }

        this.countOauthErrors++

        return this.fetchWithOauth(baseUrl, endpoint, data, method, headers)
      }
    }

    headers.Authorization = authToken
    headers.brand = headers.brand ?? this.brand
    headers['Content-Type'] = 'application/json'

    const response = await this.fetchGeneric(
      baseUrl,
      endpoint,
      data,
      method,
      headers,
      isBlob
    )
    if (
      typeof response === 'undefined' ||
      getPropManager(response, 'fault.detail.errorcode', '') === this.tokenExpiredCode
    ) {
      if (this.countOauthErrors > 3) {
        const actualPage = window.location.origin
        window.location.replace(actualPage + '/maintainance')
        return {
          code: 500,
          data: {},
          message: 'Fallo el servicio de oauth'
        }
      }
      StorageManager.removeSessionStorage('TOKEN_DATA')
      this.countOauthErrors++

      return this.fetchWithOauth(baseUrl, endpoint, data, method, headers)
    }

    if (response.code === 1050 || response.code === 4000) {
      StorageManager.removeSessionStorage('creditSessionId')
      location.reload()
    }

    this.countOauthError = 0

    return response
  }

  fetchGeneric = async (baseUrl, endpoint, data, method, headers = {}, isBlob = false) => {
    try {
      const url = `${baseUrl}/${endpoint}`
      if (this.site !== '') {
        headers.site = this.site
      }
      const response = await fetch(url, {
        credentials: 'include',
        method,
        headers,
        body: data ? JSON.stringify(data) : null
      })
      return !isBlob ? response.json() : response.blob()
    } catch (err) {
      console.error(`${method} error: ${err}`)
    }
  }

  fetchOauth = async (baseUrl, endpoint, basic, data) => {
    try {
      const url = `${baseUrl}/${endpoint}?grant_type=client_credentials`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: basic,
          'Content-Type': 'application/json',
          applicationKey: getApplicationKey(),
          applicationType: 'WEB',
          site: this.site
        },
        body: data ? JSON.stringify(data) : null
      })
      return response.json()
    } catch (err) {
      console.error(`POST error: ${err}`)
    }
  }
}

export default ServiceManager
