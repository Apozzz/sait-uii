import api from '@/api/api';

export default {
    getCurrentUser(token) {
        return api.get(`/api/user`, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    },
}