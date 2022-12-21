import api from '@/api/api';

export default {
    getRooms(token) {
        return api.get(`/api/v1/rooms`, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    },

    getRoom(roomId, token) {
        return api.get(`/api/v1/rooms/${roomId}`, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    },

    createRoom(room, token) {
        return api.post(`/api/v1/rooms`, room, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    },

    updateRoom(room, token) {
        return api.patch(`/api/v1/rooms/${room.id}`, room, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    },

    rentRoom(room, token) {
        return api.patch(`/api/v1/rooms/${room.id}`, room, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    },

    deleteRoom(id, token) {
        return api.delete(`/api/v1/rooms/${id}`, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    }
}