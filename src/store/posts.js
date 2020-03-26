import axios from 'axios'

export default {
    state: {
        postsData: []
    },
    mutations: {
        SET_POSTS_TO_STATE: (state, posts) => {
            state.postsData = posts
        },
        CLAPS(state, index) {
            state.postsData[index].claps++
        },
        DELETE_POST(state, index) {
            state.postsData.splice(index, 1)
        },
        UPDATE_POST(state, payload) {
            state.postsData[payload.index] = payload.post
        },
        // CREATE_POST(state, post) {
        //     console.log("MUT POST CREATE", post)
        //     state.postsData.push(post)
        // }
    },
    actions: {
        GET_POSTS_FROM_API({ commit }) {
            return axios('http://localhost:3000/posts', {
                method: 'GET'
            })
                .then((posts) => {
                    commit('SET_POSTS_TO_STATE', posts.data)
                    return posts
                })
                .catch((error) => {
                    console.log(error)
                    return error
                })
        },
        async claps({ state, commit }, index) {
            await axios(`http://localhost:3000/posts/${state.postsData[index].id}`, {
                method: 'PATCH',
                data: {
                    claps: state.postsData[index].claps + 1
                }
            })
            commit('CLAPS', index)
        },
        async deletePost({ state, commit }, index) {

            await axios(`http://localhost:3000/posts/${state.postsData[index].id}`, {
                method: 'DELETE'
            })


            commit('DELETE_POST', index)
        },
        async updatePost({ commit }, payload) {
            let id = payload.post.id
            delete payload.post.id

            await axios(`http://localhost:3000/posts/${id}`, {
                method: 'PUT',
                data: payload.post
            })
            commit('UPDATE_POST', payload)
        },
        createPost({ commit }, post) {
            commit('CREATE_POST', post)
            return axios('http://localhost:3000/posts', {
                method: 'POST',
                data: post
            })
            // .then((posts) => {
            //     commit('SET_POSTS_TO_STATE', posts.data)
            //     return posts
            // })
            // .catch((error) => {
            //     console.log(error)
            //     return error
            // })
        }
    },
    getters: {
        POSTS(state) {
            return state.postsData
        },
        getPost: (state) => (index) => {
            return state.postsData[index]
        }
    }
}