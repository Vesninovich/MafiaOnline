// import { SEND_MESSAGE } from '../actionTypes'
import { ADD_MESSAGE } from '../actionTypes'

// export function sendMessage(text, name) {
export function sendMessage(text, id) {
    return {
        // type: SEND_MESSAGE,
        type: ADD_MESSAGE,
        id,
        text,
        // name
    }
}