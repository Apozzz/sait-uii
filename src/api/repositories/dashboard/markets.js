import api from '@/api/api';

export default {
    getMarkets(token) {
        return api.get(`/api/v1/markets`, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    },
    getMarket(marketId, token) {
        return api.get(`/api/v1/markets/${marketId}`, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    },
    createMarket(market, token) {
        return api.post(`/api/v1/markets`,
            market,
            { headers: {'Authorization': `Bearer ${token}`}}
        );
    },
    updateMarket(market, token) {
        return api.patch(`/api/v1/markets/${market.id}`,
            market,
            { headers: {'Authorization': `Bearer ${token}`}}
        );
    },
    deleteMarket(marketId, token) {
        return api.delete(`/api/v1/markets/${marketId}`,
            { headers: {'Authorization': `Bearer ${token}`}}
        );
    }
}