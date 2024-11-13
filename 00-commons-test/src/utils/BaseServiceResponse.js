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

export default class BaseServiceResponse {
  code
  description
  data

  constructor(code, description) {
    this.code = code
    this.description = description
  }

  setData(data) {
    this.data = data
  }
}
