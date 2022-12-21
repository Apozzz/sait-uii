import api from '@/api/api';

export default {
    getPublicRooms() {
        return api.get(`/api/v1/rooms`);
    },
}