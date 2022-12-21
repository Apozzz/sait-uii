import repository from '@/api/repositories/home/rooms';

export const state = {
    rooms: null,
};

export const getters = {
    rooms: state => state.rooms
};

export const mutations = {
    SET_ROOMS(state, rooms) {
        state.rooms = rooms;
    }
};

export const actions = {
    async getPublicRooms({ commit }) {
        const { data } = await repository.getPublicRooms();
        commit('SET_ROOMS', data.data);
    }
}