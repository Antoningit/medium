const user1 = {
    id: 1,
    login: "writer@mail.com",
    password: 123456,
    role: "writer"
};

const user2 = {
    id: 2,
    login: "reader@mail.com",
    password: 123456,
    role: "reader"
};

export default {
    state: {
        authUser: null
    },
    mutations: {
        SET_AUTH_USER(state, user) {
            state.authUser = user
        }
    },
    actions: {
        authintificate({ commit }, credentials) {
            console.log('authintificate', credentials)
            if (credentials.login == user1.login && credentials.password == user1.password) {
                commit('SET_AUTH_USER', user1)
                return true
            }
            if (credentials.login == user2.login && credentials.password == user2.password) {
                commit('SET_AUTH_USER', user2)
                return true
            }
            return false
        },
        logOut({ commit }) {
            commit('SET_AUTH_USER', null)
        },

    },
    getters: {
        authStatus(state) {
            return state.authUser ? true : false
        },
        authUser(state) {
            return state.authUser
        },
        isWriter(state) {
            if (state.authUser) {
                return state.authUser.role == 'writer' ? true : false
            }
            return false
        },
        isReader(state) {
            if (state.authUser) {
                return state.authUser.role == 'reader' ? true : false
            }
            return false
        }
    }
}