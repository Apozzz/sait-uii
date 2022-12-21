import api from '@/api/api';

export default {
    getSectors(token) {
        return api.get(`/api/v1/sectors`, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    },

    getSector(sectorId, token) {
        return api.get(`/api/v1/sectors/${sectorId}`, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    },

    createSector(sector, token) {
        return api.post(`/api/v1/sectors`, sector, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    },

    updateSector(sector, token) {
        return api.patch(`/api/v1/sectors/${sector.id}`, sector, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    },

    deleteSector(id, token) {
        return api.delete(`/api/v1/sectors/${id}`, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    }
}