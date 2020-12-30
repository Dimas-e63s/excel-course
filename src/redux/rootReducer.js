import {TABLE_RESIZE, CHANGE_TEXT, CHANGE_STYLES, APPLY_STYLE, CHANGE_TITLE} from './types'
import {toInlineStyles} from '@core/utils'
export function rootReducer(state, action) {
    let field
    switch(action.type) {
        case TABLE_RESIZE:
          field = action.data.type === 'col' ? 'colState' : 'rowState' 
          return {...state, [field]: val(state, field, action)}
        case CHANGE_TEXT: 
          field = 'dataState'
          return {...state, currentText: action.data.value, [field]: val(state, field, action)}
        case CHANGE_STYLES:
          return {...state, currentStyles: action.data}
        case APPLY_STYLE: 
          field = 'stylesState'
          const value = state[field] || {}
          action.data.ids.forEach(id => {
            value[id] = {...value[id], ...action.data.value}
          })
         return {
          ...state,
          [field]: value,
          currentStyles: {...state.currentStyles, ...action.data.value}
        }
        case CHANGE_TITLE:
          return {...state, title: action.data}
        default: return state
    }
}

function val(state, field, action) {
  const val = state[field] || {}
  val[action.data.id] = action.data.value
  return val
}