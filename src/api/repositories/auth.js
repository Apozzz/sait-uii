import api from '@/api/api';

export default {
    register(payload) {
        return api.post(`/api/register`, payload);
    },
    login(payload) {
        return api.post(`/api/login`, payload);
    },
    logout() {
        return api.post('api/logout');
    }
}