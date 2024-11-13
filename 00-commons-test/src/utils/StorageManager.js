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

class StorageManager {
  static getLocalStorage = key => {
    return localStorage.getItem(key)
  }

  static setLocalStorage = (key, value) => {
    return localStorage.setItem(key, value)
  }

  static getSessionStorage = key => {
    return sessionStorage.getItem(key)
  }

  static setSessionStorage = (key, value) => {
    return sessionStorage.setItem(key, value)
  }

  static removeSessionStorage = key => {
    sessionStorage.removeItem(key)
  }
}

export default StorageManager
