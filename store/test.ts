import {defineStore} from 'pinia'
const state = () => ({
    message:"Hello this is test message"
})

const getters = {}

const actions = {}

export const useTestStore = defineStore('user', {
    state,
    getters,
    actions,
})