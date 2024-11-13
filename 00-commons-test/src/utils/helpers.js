/**
 * Copyright (c) 2023 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2023
 *
 * @author: Julio Fuentes [19/09/2024]
 * @updated: ---
 * @description: .
 * @version 1.0.0
 **/

import { ClientJS } from 'clientjs';
import StorageManager from '../utils/StorageManager';

const THEME_STORAGE_KEY = 'themeConfig'

// Se define el nombre de la caché y su tiempo de caducidad
const CACHE_NAME = 'theme-cache'
const CACHE_EXPIRATION_TIME = 600000 // 10 minutos de caducidad

export const getProp = (object, keys, defaultVal) => {
  keys = Array.isArray(keys) ? keys : keys.split('.')
  object = object[keys[0]]
  if (object && keys.length > 1) {
    return getProp(object, keys.slice(1))
  }
  return object === undefined ? defaultVal : object
}

export const isEmpty = objectToValidate => {
  return !objectToValidate || Object.keys(objectToValidate).length === 0
}

export const isNotEmpty = obj => {
  return !isEmpty(obj)
}

export const isEmptyObject = obj => {
  return (
    obj == null || typeof obj === 'undefined' || JSON.stringify(obj) === '{}'
  )
}

export const isEmptyArray = obj => {
  return (
    obj == null || typeof obj === 'undefined' || JSON.stringify(obj) === '[]'
  )
}

export const isString = obj => {
  let r = false
  if (!isEmpty(obj)) {
    const patt = /^\D+$/g
    const s = obj.toString()
    r = patt.test(s)
  }
  return r
};

export const isAlphaSpace = obj => {
  let r = false
  if (isNotEmpty(obj) && isString(obj)) {
    const patt =
      /^[A-Za-z\s\u00f1\u00d1\u00dc\u00fc\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da]+$/
    const s = obj.toString()
    r = patt.test(s)
  }
  return r
};

export const isValidExpireDate = obj => {
  let r = false
  const regx = /^(\d{2}\/\d{2})$/g

  if (regx.test(obj)) {
    r = true
  }

  return r
};

export const isOnlyNumbers = obj => {
  let r = false
  const regx = /^\d*$/g

  if (regx.test(obj)) {
    r = true
  }

  return r
};

export const isEmail = obj => {
  let r = false
  // eslint-disable-next-line no-control-regex
  const regex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  if (regex.test(obj)) {
    r = true
  }

  return r
};
export const isMarkedPhoneNumber = obj => {
  let r = false
  const regex = /\*{6}\d{4}/

  if (regex.test(obj)) {
    r = true
  }

  return r
};
export const getAuthData = () => {
  return getProp(
    JSON.parse(StorageManager.getSessionStorage(THEME_STORAGE_KEY)),
    'authData'
  )
};

export const getBrand = () => {
  return getProp(
    JSON.parse(StorageManager.getSessionStorage(THEME_STORAGE_KEY)),
    'brandId'
  )
};

export const getApplicationKey = () => {
  return getProp(
    JSON.parse(StorageManager.getSessionStorage(THEME_STORAGE_KEY)),
    'applicationKey'
  )
};

export const getDomain = () => {
  const hostName = window.location.host
  const hostSplitted = hostName.split('.')
  if (hostSplitted.length < 3) {
    return 'domainError'
  }
  return (
    hostSplitted[hostSplitted.length - 3] +
    '.' +
    hostSplitted[hostSplitted.length - 2] +
    '.' +
    hostSplitted[hostSplitted.length - 1]
  )
};

export const isSuburbiaDomain = () => {
  const domain = getDomain()
  // TODO Define a constant for this char
  return domain.includes('suburbia')
};

/* Function to get browser id, taken from Credito 1.0 app and was updated on 06/07/2023 */
export const getDeviceId = () => {
  const fingerPrint = new ClientJS()
  const isMobile = fingerPrint.isMobile()
  const screenPrint = isMobile ? fingerPrint.getScreenPrint() : ''
  const deviceData =
    fingerPrint.getBrowser() +
    fingerPrint.getEngine() +
    fingerPrint.getDeviceVendor() +
    fingerPrint.getCPU() +
    isMobile +
    fingerPrint.isIpad() +
    screenPrint +
    fingerPrint.getLanguage() +
    fingerPrint.getCanvasPrint()
  return (
    getBrowserId(fingerPrint) +
    '-' +
    fingerPrint.getCustomFingerprint(deviceData, null)
  )
};

/* Function to get browser id, taken from Credito 1.0 app */
export const getBrowserId = fingerPrint => {
  let browserId = '00'
  // Internet Explorer 6-11
  const isIE = /* @cc_on!@ */ false || !!document.documentMode
  // Edge 20+
  const isEdge = !isIE && !!window.StyleMedia
  // Chrome 1 - 79
  const isChrome =
    !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)
  // Edge (based on chromium) detection
  const isEdgeChromium = isChrome && navigator.userAgent.indexOf('Edg') !== -1

  if (fingerPrint.isFirefox()) {
    browserId = '01'
  }
  if (fingerPrint.isChrome()) {
    browserId = '02'
  }
  if (fingerPrint.isOpera()) {
    browserId = '03'
  }
  if (fingerPrint.isSafari() || fingerPrint.isMobileSafari()) {
    browserId = '04'
  }
  if (isEdge || isEdgeChromium || fingerPrint.getBrowser() === 'Edge') {
    browserId = '05'
  }
  if (fingerPrint.isIE()) {
    browserId = '06'
  }
  return browserId
};

export const capitalizeAllWords = str =>
  str
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, w => w.replace(/^\w/, c => c.toUpperCase()))

// * Card number formatted in input text
// * Add one space every 4 numbers, ej: 1234 1234 5678 5678 or number SPEI 1234 1234 5678 5678 12
// * Only config max attribute from input text: 22 from SPEI 19 for card number
export const onChangeInputData = e => {
  const value = e.target.value
  const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,2})$/g
  const onlyNumbers = value.replace(/[^\d]/g, '')
  const formated = onlyNumbers.replace(regex, (regex, $1, $2, $3, $4, $5) =>
    [$1, $2, $3, $4, $5].filter(group => !!group).join(' ')
  )

  return formated
};

export const generateId = () => {
  const random = Math.random().toString(36)
  const date = Date.now().toString(36)
  const result = random + date
  return result.substring(3, result.length)
};

export const base64 = () => ({
  encode: str => {
    // Convert the string to a UTF-8 byte array
    const bytes = new TextEncoder().encode(str)

    // Use the built-in btoa() function to encode the byte array as base64
    const base64Value = btoa(String.fromCharCode(...bytes))

    return base64Value
  },
  decode: () => {
    // Use the built-in atob() function to decode the base64 string
    const bytes = new Uint8Array(
      atob(base64)
        .split('')
        .map(char => char.charCodeAt(0))
    )

    // Convert the byte array back to a UTF-8 string
    const str = new TextDecoder().decode(bytes)

    return str
  }
});


// Se define la función asíncrona parseResponse, que se utiliza para analizar la respuesta de la caché
const parseResponse = async response => {
  // Si no hay respuesta, se devuelve un objeto con los encabezados y el cuerpo de la respuesta nulos
  if (!response) {
    return { headers: null, json: null }
  }

  // Se obtienen los encabezados de la respuesta y se analiza el cuerpo de la respuesta en formato JSON

  const headers = response.headers
  const json = await response.json()

  // Se devuelve un objeto con los encabezados y el cuerpo de la respuesta en formato JSON
  return { headers, json }
};

// Se define la función isValidCacheExpiration, que se utiliza para comprobar si la respuesta en caché ha expirado
const isValidCacheExpiration = expirationTime => {
  // Se obtiene la fecha actual en milisegundos
  const now = Date.now()
  // Se convierte la fecha de caducidad de la caché en milisegundos
  const expirationDate = new Date(expirationTime).getTime()
  // Se comprueba si la fecha de caducidad es posterior a la fecha actual
  return expirationDate > now
};

export default {
  capitalizeAllWords,
  getDomain,
  generateId,
  getBrowserId,
  getDeviceId,
  getProp,
  getAuthData,
  getBrand,
  isSuburbiaDomain,
  isEmpty,
  isNotEmpty,
  isEmptyObject,
  isEmptyArray,
  isAlphaSpace,
  isOnlyNumbers,
  isEmail,
  isMarkedPhoneNumber,
  onChangeInputData,
  base64
};
