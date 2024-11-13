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

import { Subject } from "rxjs";

export let subjects = {};
export let subscriptions = {};

export const send = (topic, data) => {
  if (!subjects[topic]) {
    subjects[topic] = new Subject();
    window.addEventListener(topic, (data) => {
      subjects[topic].next(data.detail);
    });
  }
  window.dispatchEvent(new CustomEvent(topic, { detail: data }));
};

export const get = (topic) => {
  if (!subjects[topic]) {
    subjects[topic] = new Subject();
    window.addEventListener(topic, (data) => {
      subjects[topic]?.next(data.detail);
    });
  }
  return subjects[topic].asObservable();
};

export const clearSubjects = (properties) => {
  if (properties) {
    let propertyTags = Object.keys(properties);
    for (let property of propertyTags) {
      if (subscriptions[property]) {
        subscriptions[property].unsubscribe();
      }
    }
  }
};

export default {
  clearSubjects,
  get,
  send,
  subjects,
  subscriptions
}
