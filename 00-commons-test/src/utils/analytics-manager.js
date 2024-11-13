/**
 * Copyright (c) 2024 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2024
 * 
 * @author: Julio Fuentes [19/09/2024]
 * @updated: ---
 * @description: .
 * @version 1.0.0
**/

import AnalyticsManager from '../classes/analyticsManager';
import { KEY_TAG_MANAGER, CT_LPC_NEGRA, CT_LPC_ROSA, CT_LPC_GAL, CT_DIL_LIV, CT_DIL_FF, CT_DIL_LIVERT, CT_DIL_FABRIC, CT_DIL_GRIS, CT_DIL_GUAR, CT_MED, SBB_LPC, SBB_DIL } from './constants';
import helpers from './helpers';

const analyticsManager = new AnalyticsManager(KEY_TAG_MANAGER, false)

export const sendAnalyticsEvent = ({
  seccion = null,
  event = null,
  extraData
}) => {
  const liverpoolLayer = {
    seccion,
    event,
    ...extraData
  }

  if (!event) {
    delete liverpoolLayer.event
  }

  analyticsManager?.publishEvent(liverpoolLayer)
}

export const getCardTypeForAnalytics = cardType => {
  const categoryType = {
    [CT_LPC_NEGRA]: 'Liverpool VISA',
    [CT_LPC_ROSA]: 'Liverpool VISA',
    [CT_LPC_GAL]: 'Liverpool VISA',
    [CT_DIL_LIV]: 'Liverpool',
    [CT_DIL_FF]: 'Liverpool',
    [CT_DIL_LIVERT]: 'Liverpool',
    [CT_DIL_FABRIC]: 'Liverpool',
    [CT_DIL_GRIS]: 'Liverpool',
    [CT_DIL_GUAR]: 'Liverpool',
    [CT_MED]: 'Liverpool',
    [SBB_LPC]: 'Suburbia VISA',
    [SBB_DIL]: 'Suburbia'
  }
  return helpers.getProp(categoryType, cardType, '')
}