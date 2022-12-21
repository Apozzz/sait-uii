import repository from '@/api/repositories/dashboard/rooms';
import sectorsRepository from '@/api/repositories/dashboard/sectors';
import marketsRepository from '@/api/repositories/dashboard/markets';
import usersRepository from '@/api/repositories/dashboard/users';

export const state = {
    markets: null,
    sectors: null,
    rooms: null,
    user: null,
};

export const getters = {
    markets: state => state.markets,
    sectors: state => state.sectors,
    rooms: state => state.rooms,
    user: state => state.user,
};

export const mutations = {
    SET_MARKETS(state, markets) {
        state.markets = markets;
    },
    SET_SECTORS(state, sectors) {
        state.sectors = sectors;
    },
    SET_ROOMS(state, rooms) {
        state.rooms = rooms;
    },
    SET_USER(state, user) {
        state.user = user;
    },
};

export const actions = {
    // Roooms
    async getRooms({ commit }, token) {
        const { data } = await repository.getRooms(token);
        commit('SET_ROOMS', data.data);
    },
    async getRoom(_, { id, token }) {
        await repository.getRoom(id, token);
    },
    async createRoom(_, { room, token }) {
        await repository.createRoom(room, token);
    },
    async rentRoom(_, {room, token}) {
        await repository.rentRoom(room, token);
    },
    async updateRoom(_, { room, token }) {
        await repository.updateRoom(room, token);
    },
    async deleteRoom(_, {id, token}) {
        await repository.deleteRoom(id, token);
    },

    // Sectors
    async getSectors({ commit }, token) {
        const { data } = await sectorsRepository.getSectors(token);
        commit('SET_SECTORS', data.data);
    },
    async getSector(_, { id, token }) {
        await sectorsRepository.getSector(id, token);
    },
    async createSector(_, { sector, token }) {
        await sectorsRepository.createSector(sector, token);
    },
    async updateSector(_, { sector, token }) {
        await sectorsRepository.updateSector(sector, token);
    },
    async deleteSector(_, { id, token }) {
        await sectorsRepository.deleteSector(id, token);
    },

    //Markets
    async getMarkets({ commit }, token) {
        const { data } = await marketsRepository.getMarkets(token);
        commit('SET_MARKETS', data.data);
    },
    async getMarket(_, { id, token }) {
        await marketsRepository.getMarket(id, token);
    },
    async createMarket(_, { market, token }) {
        await marketsRepository.createMarket(market, token);
    },
    async updateMarket(_, { market, token }) {
        await marketsRepository.updateMarket(market, token);
    },
    async deleteMarket(_, { id, token }) {
        await marketsRepository.deleteMarket(id, token);
    },
    async getCurrentUser({ commit }, token) {
        const { data } = await usersRepository.getCurrentUser(token);
        commit('SET_USER', data);
    },
}