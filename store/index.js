import Vue from 'vue'
// import vuexCache from 'vuex-cache';
// import createCache from 'vuex-cache';
// export const plugins = [vuexCache, createCache()]
import axios from "axios"

export const state = () => ({
    apiRoot: 'https://cockpit.hackmylanguage.com',
    assetRoot: '/storage/uploads',
    apiKeys: {
        collections: 'ffcadb7b92232dd64da8cda5fa895d',
        home: '2ebf8f6026133a63f0d7547204161e',
    },
    collection: [],
    page: [],


})

export const mutations = {


    setData: (state, payload) => (state.collection = payload),
    setPage: (state, payload) => (state.page = payload),

    pushData(state, payload) {
        for (let index = 0; index < payload.length; index++) {
            state.collection.push(payload[index])
        }
    }
}

export const getters = {

}

export const actions = {

    async FETCH_SINGLETON({ commit, state }, payload) {

        const { data } = await axios.post(state.apiRoot + '/api/singletons/get/' + payload.name + '?token=' + state.apiKeys.home, payload.body)
        console.log(data.entries)
        commit('setData', data.entries)

    },
    async FETCH_COLLECTION_ASYNC({ commit, state }, payload) {

        const { data } = await axios.post(state.apiRoot + '/api/collections/get/' + payload.name + '?token=' + state.apiKeys.collections, payload.body)
        commit('setData', data.entries)

    },

    async FETCH_COLLECTION_PAGE_ASYNC({ commit, state }, payload) {

        const { data } = await axios.post(state.apiRoot + '/api/collections/get/' + payload.name + '?token=' + state.apiKeys.collections, payload.body)
        commit('setPage', data.entries)

    },
    async PUSH_COLLECTION_ASYNC({ commit, state }, payload) {

        const { data } = await axios.post(state.apiRoot + '/api/collections/get/' + payload.name + '?token=' + state.apiKeys.collections, payload.body)
        // commit('pushData', Object.assign({}, data.entries))

        commit('pushData', data.entries)
        // console.log(data.entries)

    },



}


