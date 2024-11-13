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
import BaseInteractor from './BaseInteractor.js';
import intl from "react-intl-universal";

const TIME_TO_REFRESH_LABELS = 300000

class LabelsManager {
  baseInteractor;
  context = "labels";

  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.baseInteractor = new BaseInteractor();
  }

  static saveLabel = (prefix, labels) => {
    StorageManager.setLocalStorage(prefix, JSON.stringify(labels))
    StorageManager.setLocalStorage(`LABELS_${prefix}_DOMAIN`, Date.now())
  }

  static getLabelTraductor = (intl, key, customValue) => {
    try {
      return intl.get(key) && intl.get(key)?.length > 0 ? intl.get(key) : customValue;
    } catch (error) {
      console.log(error);
      return customValue;
    }
  }

  static validateResfreshTime = prefix => {
    const timeToRefresh = this.getLabel(
      prefix,
      `${prefix}_TIME_REFRESH_LABELMAPS`
    )
    const TimeLabelMapsRefresh =
      timeToRefresh !== '' ? parseInt(timeToRefresh) : TIME_TO_REFRESH_LABELS
    const timeUnilRefresh =
      Date.now() -
      parseInt(StorageManager.getLocalStorage(`LABELS_${prefix}_DOMAIN`))
    return timeUnilRefresh > TimeLabelMapsRefresh
  }

  static getLabel = (mfValue, key, defaultValue = '') => {
    const labels = JSON.parse(StorageManager.getLocalStorage(mfValue))
    const labelKey = labels && labels[key]
    return labelKey || defaultValue
  }

  getLabelsKeyLang = async (param) => {
    const url = `${this.baseUrl}/labels/findByPrefixAndLang`;
    let headers = {
      'sessionId': 'c',
      brandId: 1
    };

    if ('lang' in param) headers['lang'] = param.lang
    if ('key' in param) headers['key'] = param.key

    const response = await this.baseInteractor.makeRequest(url, 'GET', headers);

    if (response.code >= 300) {
      showAlertMessage({
        type: 'warning',
        message: getAllErrorMessagesManager(response)
      })

      return null
    }

    return response
  }

  getLabels = async (param) => {
    let labels = StorageManager.getLocalStorage('Labels')
    let timeLabelMapsRefresh = 0;
    let jsonLabels = ""

    if (labels) {
      jsonLabels = JSON.parse(labels)
      timeLabelMapsRefresh = jsonLabels.domain ? parseInt(jsonLabels.domain.timeRefeshLabelMaps) : TIME_TO_REFRESH_LABELS
    }

    if (labels && param.refresh && jsonLabels.domain !== null && Date.now() - parseInt(jsonLabels.domain.lastLabelsRefreshed) < timeLabelMapsRefresh) {
      return { locales: jsonLabels.data }
    } else {
      const resp = await this.getLabelsKeyLang(param)

      if (resp) {
        var localsesLang = Object.groupBy(resp.data.labels, ({ language }) => language)
        var datax = Object.keys(localsesLang)

        datax.forEach((local) => { localsesLang[local] = localsesLang[local].reduce((acc, cur) => ({ ...acc, [cur.key]: cur.value }), {}) });

        var labelsMaps = {
          domain: { timeRefeshLabelMaps: TIME_TO_REFRESH_LABELS, lastLabelsRefreshed: Date.now() },
          data: localsesLang
        }

        StorageManager.setLocalStorage('Labels', JSON.stringify(labelsMaps));

        return { locales: localsesLang }
      }
    }
  }
}

export default LabelsManager
