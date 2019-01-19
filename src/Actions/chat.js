import { SEND_MESSAGE } from '../actionTypes'

export function sendMessage(text, name) {
    return {
        type: SEND_MESSAGE,
        text,
        name
    }
}