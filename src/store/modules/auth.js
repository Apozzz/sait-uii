import repository from '@/api/repositories/auth';

export const state = {
    user: localStorage.user ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.user ? JSON.parse(localStorage.getItem('access_token')) : null
};

export const getters = {
    user: state => state.user,
    token: state => state.token,
    authenticated: state => state.user !== null,
};

export const mutations = {
    SET_USER(state, user) {
        state.user = user;
    },
    SET_TOKEN(state, token) {
        state.token = token;
    }
};

export const actions = {
    async login({commit}, payload) {
        const { data } = await repository.login(payload);
        const token = data.message;
        const role = token.includes('admin') ? 'admin' : 'member';
        const user = { email: payload.email, password: payload.password, role: role };
        commit('SET_USER', user);
        commit('SET_TOKEN', token);

        localStorage.user = JSON.stringify(user);
        localStorage.access_token = JSON.stringify(token);
    },
    async logout({ commit }) {
        commit('SET_USER', null);
        commit('SET_TOKEN', null);

        localStorage.removeItem('user');
        localStorage.removeItem('access_token');

        await repository.login();
    },
    async register(_, payload) {
        await repository.register(payload);
    }
}