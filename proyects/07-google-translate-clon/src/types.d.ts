import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "./constants"

export type Language = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = Language | AutoLanguage

export interface State {
    fromLanguage: FromLanguage,
    toLanguage: Language,
    fromText: string,
    result: string,
    loading: boolean
}

export type Action = 
    | {type: 'INTERCHANGE_LENGUAJES' }
    | {type: 'SET_FROM_LENGUAGE', payload:FromLanguage}
    | {type: 'SET_TO_LENGUAGE', payload:Language}
    | {type: 'SET_FROM_TEXT', payload:string}
    | {type: 'SET_RESULT', payload:string}

export enum SectionType {
    From = 'from',
    To = 'to'
}

